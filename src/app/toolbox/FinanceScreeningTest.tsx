"use client";
import DownloadIcon from "@mui/icons-material/Download";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import StopCircleRounded from "@mui/icons-material/StopCircleRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TextScanningEffect from "../../components/loading/TextScanningEffect";

// Speech Recognition interfaces
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

// Default prompt template for the financial risk assessment
const DEFAULT_PROMPT = `你是一位專業的財務風險分析專家，現在需要嚴格基於用戶提供的財務文本資料和知識圖譜，
為財務風險評估問卷的每個題目選擇最適合的選項。僅限於從提供的資料中提取資訊。

請基於財務文本和知識圖譜中的資訊，理解每個問題並選擇合適的選項，同時提供可信度評分
（0-1之間的小數）。只有當您在提供的資料中找到明確且直接的證據時，才能給予較高的信賴度
（例如：0.8以上）。如果資訊是間接的、需要推斷的，或者不確定，請降低信賴度。

如果財務文本和知識圖譜中沒有提及對應題目的資訊，請在 reasoning 欄位中明確說明，並建議
『下次會議請確認此資訊』。`;

// API URL
const API_URL = "/api/v1/ai/test-financial-assessment";

// Interface for the API response
interface FinancialAssessmentResponse {
  status: string;
  message: string;
  responseList: FinancialAssessmentItem[];
}

interface FinancialAssessmentItem {
  familyfinhealthCaseSurveyResponseId: string;
  organizationColumn: {
    columnId: string;
    columnName: string;
    columnSort: number;
    organizationColumnGroup: {
      columnGroupId: string;
      columnGroupName: string;
    };
    organizationOptionList: {
      organizationOptionId: string;
      organizationOptionName: string;
      organizationOptionValue: number;
    }[];
  };
  familyfinhealthOptionId: string;
  familyfinhealthCaseSurveyResponseConfidenceScore: number;
  familyfinhealthCaseSurveyResponseReasoning: string;
  familyfinhealthCaseSurveyResponseCreateDate: string;
  isAiGenerated: string;
}

interface GroupedAssessmentItems {
  [key: string]: FinancialAssessmentItem[];
}

// Main component
export default function FinanceScreeningTest() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState(0);
  const [promptType, setPromptType] = useState("default");
  const [customPrompt, setCustomPrompt] = useState("");
  const [queryText, setQueryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] =
    useState<FinancialAssessmentResponse | null>(null);
  const [analysisTime, setAnalysisTime] = useState<string | null>(null);
  const [inputData, setInputData] = useState<{
    prompt: string;
    query: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Input validation state
  const [inputError, setInputError] = useState<string | null>(null);
  const MIN_TEXT_LENGTH = 100;

  // Calculate total risk score
  const calculateRiskScore = () => {
    if (!assessmentResult) return { score: 0, level: "" };

    const totalScore = assessmentResult.responseList.reduce((sum, item) => {
      const selectedOption =
        item.organizationColumn.organizationOptionList.find(
          (option) =>
            option.organizationOptionId === item.familyfinhealthOptionId
        );
      return sum + (selectedOption?.organizationOptionValue || 0);
    }, 0);

    let level = "";
    let color = "";

    if (totalScore >= 14 && totalScore <= 23) {
      level = "低度財務風險";
      color = "success.main"; // green
    } else if (totalScore >= 24 && totalScore <= 33) {
      level = "中度財務風險";
      color = "warning.main"; // yellow
    } else if (totalScore >= 34 && totalScore <= 45) {
      level = "高度財務風險";
      color = "error.main"; // red
    }

    return { score: totalScore, level, color };
  };

  // Group items by columnGroupName
  const groupAssessmentItems = (): GroupedAssessmentItems => {
    if (!assessmentResult) return {};

    return assessmentResult.responseList.reduce((groups, item) => {
      const groupName =
        item.organizationColumn.organizationColumnGroup.columnGroupName;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
      return groups;
    }, {} as GroupedAssessmentItems);
  };

  // Sort items by columnSort
  const sortAssessmentItems = (
    items: FinancialAssessmentItem[]
  ): FinancialAssessmentItem[] => {
    return [...items].sort(
      (a, b) =>
        a.organizationColumn.columnSort - b.organizationColumn.columnSort
    );
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "zh-TW";

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const finalTranscript = Array.from(event.results)
            .map((result) => result[0]?.transcript)
            .join("");
          setQueryText(finalTranscript);
        };

        recognitionRef.current.onerror = (
          event: SpeechRecognitionErrorEvent
        ) => {
          setSpeechError(event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    } else {
      setSpeechError("您的瀏覽器不支援語音辨識功能");
    }

    // Cleanup
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle voice input
  const handleListening = useCallback(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
        setSpeechError(null);
      }
    }
  }, [isListening]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    if (queryText.trim().length < MIN_TEXT_LENGTH) {
      setInputError(`輸入文字需至少 ${MIN_TEXT_LENGTH} 字`);
      setIsLoading(false);
      return;
    }

    const prompt = promptType === "default" ? DEFAULT_PROMPT : customPrompt;
    const payload = { prompt, query: queryText };
    setInputData(payload);

    try {
      // Make the actual API call to the financial assessment endpoint
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setAssessmentResult(data);
      setAnalysisTime(new Date().toISOString());
      setActiveTab(1); // Switch to result tab
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setApiError(
        error instanceof Error ? error.message : "發生未知錯誤，請稍後再試"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Download assessment as text file
  const handleDownloadAssessment = () => {
    if (!assessmentResult || !inputData || !analysisTime) return;

    const content = [
      "--- 財務評估輸入資料 ---",
      "提示詞:",
      inputData.prompt,
      "\n查詢內容:",
      inputData.query,
      "\n--- 財務評估結果 ---",
      JSON.stringify(assessmentResult, null, 2),
      "\n--- 分析完成時間 ---",
      analysisTime,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `財務風險評估_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render input form
  const renderInputForm = () => (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          輸入提示詞
        </Typography>
        <RadioGroup
          row={!isMobile}
          value={promptType}
          onChange={(e) => setPromptType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="default"
            control={<Radio />}
            label="預設提示詞"
          />
          <FormControlLabel
            value="custom"
            control={<Radio />}
            label="自訂提示詞"
          />
        </RadioGroup>

        {promptType === "default" ? (
          <TextField
            fullWidth
            multiline
            rows={8}
            disabled
            value={DEFAULT_PROMPT}
            variant="outlined"
            sx={{ mb: 2, bgcolor: "background.paper" }}
          />
        ) : (
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="請輸入自訂提示詞..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setCustomPrompt(DEFAULT_PROMPT)}
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "0.75rem",
                py: 0.5,
              }}
            >
              載入預設提示詞
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          輸入文字資訊
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          請使用工具箱中的語音轉文字工具，將逐字稿複製到輸入框中進行測試，或點擊下方麥克風圖示直接開始語音輸入。
        </Typography>

        {speechError && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            語音辨識錯誤: {speechError}
          </Typography>
        )}

        {isLoading ? (
          // 當正在加載時，顯示文字掃描效果
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "primary.main" }}
            >
              AI 正在進行財務風險評估...
            </Typography>
            <TextScanningEffect text={queryText} isScanning={true} />
          </Box>
        ) : (
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={queryText}
              onChange={(e) => {
                setQueryText(e.target.value);
                // Clear error when user starts typing more text
                if (e.target.value.length >= MIN_TEXT_LENGTH && inputError) {
                  setInputError(null);
                }
              }}
              placeholder="請輸入或貼上文字資訊..."
              variant="outlined"
              sx={{ mb: 3 }}
              error={Boolean(apiError || inputError)}
              helperText={
                apiError || inputError || 
                `目前字數：${queryText.length}/${MIN_TEXT_LENGTH} (最少需要${MIN_TEXT_LENGTH}字)`
              }
              FormHelperTextProps={{
                sx: {
                  color: queryText.length >= MIN_TEXT_LENGTH ? 'success.main' : 'text.secondary',
                  fontWeight: queryText.length >= MIN_TEXT_LENGTH ? 500 : 400,
                }
              }}
            />
            <IconButton
              aria-label="語音輸入"
              onClick={handleListening}
              className={isListening ? "mic-listening" : ""}
              sx={{
                position: "absolute",
                bottom: "8px",
                right: "12px",
                backgroundColor: isListening ? "#0066CC" : "transparent",
                "&:hover": {
                  backgroundColor: isListening ? "#004c99" : "rgba(0,0,0,0.04)",
                },
                zIndex: 1,
              }}
            >
              {isListening ? (
                <StopCircleRounded sx={{ color: "white" }} />
              ) : (
                <MicRoundedIcon sx={{ color: "black" }} />
              )}
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading || !queryText.trim() || queryText.length < MIN_TEXT_LENGTH}
          sx={{
            minWidth: isMobile ? "100%" : "200px",
            background: "var(--Secondary-, #5C443A)",
            "&:hover": {
              background: "rgba(92, 68, 58, 0.8)",
            },
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              AI 分析中...
            </>
          ) : (
            queryText.length < MIN_TEXT_LENGTH 
              ? `文字至少需要 ${MIN_TEXT_LENGTH} 字`
              : "開始財務風險評估"
          )}
        </Button>
      </Box>
    </Box>
  );

  // Render assessment result
  const renderAssessmentResult = () => {
    if (!assessmentResult) return null;

    const riskInfo = calculateRiskScore();
    const groupedItems = groupAssessmentItems();
    
    // Calculate percentage with 2 decimal places
    const scorePercentage = ((riskInfo.score / 45) * 100).toFixed(2);
    // Calculate score for gauge visualization (0-100)
    const gaugeValue = parseFloat(scorePercentage);
    
    // Define color ranges for the gauge
    const getLevelColor = () => {
      if (gaugeValue < 50) return { main: "#118D57", light: "rgba(17, 141, 87, 0.12)" }; // 低風險
      if (gaugeValue < 75) return { main: "#FFAB00", light: "rgba(255, 171, 0, 0.12)" }; // 中風險
      return { main: "#C00", light: "rgba(204, 0, 0, 0.12)" }; // 高風險
    };

    const levelColor = getLevelColor();
    const riskDescription = {
      "低度財務風險": "短期內無財務壓力，長期財務狀況良好",
      "中度財務風險": "需靠周轉維持生活，有一定財務壓力",
      "高度財務風險": "財務狀況可能危及生存、居住安全、家庭和諧或個人健康",
    };

    return (
      <Box>
        <Box 
          sx={{ 
            mb: 4, 
            textAlign: "center",
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}
        >
          {/* 環形進度條區域 */}
          <Box 
            sx={{
              position: 'relative', 
              width: isMobile ? '220px' : '280px',
              height: isMobile ? '220px' : '280px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* 背景圓環 */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={100}
                size={isMobile ? 220 : 280}
                thickness={4}
                sx={{ color: 'rgba(0, 0, 0, 0.05)' }}
              />
            </Box>
            
            {/* 進度圓環 */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={gaugeValue}
                size={isMobile ? 220 : 280}
                thickness={4}
                sx={{ color: levelColor.main }}
              />
            </Box>
            
            {/* 內部背景圓形 */}
            <Box
              sx={{
                position: 'absolute',
                width: isMobile ? '180px' : '230px',
                height: isMobile ? '180px' : '230px',
                borderRadius: '50%',
                bgcolor: levelColor.light,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h3" fontSize={isMobile ? 36 : 48} fontWeight="bold" color={levelColor.main}>
                {scorePercentage}%
              </Typography>
              <Typography variant="h6" color={levelColor.main} sx={{ mt: 1 }}>
                {riskInfo.score}/45 分
              </Typography>
              <Typography variant="h6" color={levelColor.main} fontWeight="bold" sx={{ mt: 1 }}>
                {riskInfo.level}
              </Typography>
            </Box>
          </Box>

          {/* 風險評估描述區域 */}
          <Box sx={{ maxWidth: '500px', textAlign: isMobile ? 'center' : 'left' }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 2, fontWeight: 'bold' }}>
              總體財務風險評估結果
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 2, color: levelColor.main, fontWeight: 'bold' }}>
              {riskInfo.level}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              {riskDescription[riskInfo.level as keyof typeof riskDescription]}
            </Typography>
            
            {/* <Box sx={{ 
              p: 2, 
              mt: 2, 
              borderRadius: 1,
              bgcolor: levelColor.light,
              border: `1px solid ${levelColor.main}`
            }}>
              <Typography variant="body2" fontWeight="medium">
                {riskInfo.level === "低度財務風險" && "建議：可以考慮開始進行投資規劃，提升資產收益。"}
                {riskInfo.level === "中度財務風險" && "建議：檢視支出結構，控制非必要花費，增加收入來源。"}
                {riskInfo.level === "高度財務風險" && "建議：尋求財務顧問協助制定債務減免計劃，重整財務狀況。"}
              </Typography>
            </Box> */}
          </Box>
        </Box>

        {Object.entries(groupedItems).map(([groupName, items]) => (
          <Card key={groupName} sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: 2 }}>
            <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ mb: 2, borderBottom: "1px solid", pb: 1, fontWeight: 'bold' }}
              >
                {groupName}
              </Typography>

              {sortAssessmentItems(items).map((item) => (
                <Box
                  key={item.familyfinhealthCaseSurveyResponseId}
                  sx={{ mb: 4 }}
                >
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{ mb: 1, fontWeight: 'bold' }}
                  >
                    {item.organizationColumn.columnName}
                  </Typography>

                  <RadioGroup
                    value={item.familyfinhealthOptionId}
                    sx={{ ml: isMobile ? 1 : 2, mb: 2 }}
                  >
                    {item.organizationColumn.organizationOptionList
                      .sort(
                        (a, b) =>
                          a.organizationOptionValue - b.organizationOptionValue
                      )
                      .map((option) => {
                        const isSelected = option.organizationOptionId === item.familyfinhealthOptionId;
                        return (
                          <FormControlLabel
                            key={option.organizationOptionId}
                            value={option.organizationOptionId}
                            control={
                              <Radio
                                checked={isSelected}
                                sx={isSelected ? {
                                  color: levelColor.main,
                                  '&.Mui-checked': {
                                    color: levelColor.main,
                                  }
                                } : {}}
                              />
                            }
                            label={option.organizationOptionName}
                            disabled
                            sx={{
                              ...(isSelected && {
                                fontWeight: "bold",
                                color: levelColor.main,
                              }),
                            }}
                          />
                        );
                      })}
                  </RadioGroup>

                  <Box
                    sx={{
                      ml: isMobile ? 1 : 2,
                      p: isMobile ? 1.5 : 2,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      border: '1px solid rgba(0,0,0,0.08)'
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      AI 判斷理由:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {item.familyfinhealthCaseSurveyResponseReasoning}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="subtitle2" mr={1}>
                        信賴度:
                      </Typography>
                      <Box sx={{ position: 'relative', width: '100%', mr: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.familyfinhealthCaseSurveyResponseConfidenceScore * 100} 
                          sx={{ 
                            height: 10, 
                            borderRadius: 5,
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 5,
                              bgcolor: item.familyfinhealthCaseSurveyResponseConfidenceScore > 0.7 
                                ? '#118D57' 
                                : item.familyfinhealthCaseSurveyResponseConfidenceScore > 0.4 
                                ? '#FFAB00' 
                                : '#C00'
                            }
                          }} 
                        />
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {(item.familyfinhealthCaseSurveyResponseConfidenceScore * 100).toFixed(0)}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 2,
            mt: 4,
          }}
        >
          {analysisTime && (
            <Typography variant="body2" color="text.secondary">
              分析完成時間: {new Date(analysisTime).toLocaleString()}
            </Typography>
          )}

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadAssessment}
            fullWidth={isMobile}
          >
            下載原始資料
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: isMobile ? "24px" : "32px",
          fontStyle: "normal",
          lineHeight: "normal",
          fontFamily: "var(--font-bold)",
          color: "var(--Primary-Black, #212B36)",
          textAlign: "left",
          mb: 4,
        }}
      >
        財務風險快篩系統
      </Typography>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
          >
            <Tab label="輸入資料" />
            <Tab label="快篩結果" disabled={!assessmentResult} />
          </Tabs>
        </Box>

        <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
          {activeTab === 0 && renderInputForm()}
          {activeTab === 1 && renderAssessmentResult()}
        </CardContent>
      </Card>

      {/* Add some CSS for the microphone button animation */}
      <style jsx global>{`
        .mic-listening {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Container>
  );
}
