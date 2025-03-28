'use client';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControlLabel,
    Radio,
    RadioGroup,
    Tab,
    Tabs,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Default prompt template for the financial risk assessment
const DEFAULT_PROMPT = `你是一位專業的財務風險分析專家，現在需要嚴格基於用戶提供的財務文本資料和知識圖譜，
為財務風險評估問卷的每個題目選擇最適合的選項。僅限於從提供的資料中提取資訊。

請基於財務文本和知識圖譜中的資訊，理解每個問題並選擇合適的選項，同時提供可信度評分
（0-1之間的小數）。只有當您在提供的資料中找到明確且直接的證據時，才能給予較高的信賴度
（例如：0.8以上）。如果資訊是間接的、需要推斷的，或者不確定，請降低信賴度。

如果財務文本和知識圖譜中沒有提及對應題目的資訊，請在 reasoning 欄位中明確說明，並建議
『下次會議請確認此資訊』。`;

// API URL
const API_URL = '/api/ai/test-financial-assessment';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [promptType, setPromptType] = useState('default');
  const [customPrompt, setCustomPrompt] = useState('');
  const [queryText, setQueryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<FinancialAssessmentResponse | null>(null);
  const [analysisTime, setAnalysisTime] = useState<string | null>(null);
  const [inputData, setInputData] = useState<{prompt: string; query: string} | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Calculate total risk score
  const calculateRiskScore = () => {
    if (!assessmentResult) return { score: 0, level: '' };
    
    const totalScore = assessmentResult.responseList.reduce((sum, item) => {
      const selectedOption = item.organizationColumn.organizationOptionList.find(
        option => option.organizationOptionId === item.familyfinhealthOptionId
      );
      return sum + (selectedOption?.organizationOptionValue || 0);
    }, 0);
    
    let level = '';
    let color = '';
    
    if (totalScore >= 14 && totalScore <= 23) {
      level = '低度財務風險';
      color = 'success.main'; // green
    } else if (totalScore >= 24 && totalScore <= 33) {
      level = '中度財務風險';
      color = 'warning.main'; // yellow
    } else if (totalScore >= 34 && totalScore <= 45) {
      level = '高度財務風險';
      color = 'error.main'; // red
    }
    
    return { score: totalScore, level, color };
  };

  // Group items by columnGroupName
  const groupAssessmentItems = (): GroupedAssessmentItems => {
    if (!assessmentResult) return {};
    
    return assessmentResult.responseList.reduce((groups, item) => {
      const groupName = item.organizationColumn.organizationColumnGroup.columnGroupName;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
      return groups;
    }, {} as GroupedAssessmentItems);
  };

  // Sort items by columnSort
  const sortAssessmentItems = (items: FinancialAssessmentItem[]): FinancialAssessmentItem[] => {
    return [...items].sort((a, b) => a.organizationColumn.columnSort - b.organizationColumn.columnSort);
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);
    
    const prompt = promptType === 'default' ? DEFAULT_PROMPT : customPrompt;
    const payload = { prompt, query: queryText };
    setInputData(payload);
    
    try {
      // Make the actual API call to the financial assessment endpoint
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setAssessmentResult(data);
      setAnalysisTime(new Date().toISOString());
      setActiveTab(1); // Switch to result tab
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setApiError(error instanceof Error ? error.message : '發生未知錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  // Download assessment as text file
  const handleDownloadAssessment = () => {
    if (!assessmentResult || !inputData || !analysisTime) return;
    
    const content = [
      '--- 財務評估輸入資料 ---',
      '提示詞:',
      inputData.prompt,
      '\n查詢內容:',
      inputData.query,
      '\n--- 財務評估結果 ---',
      JSON.stringify(assessmentResult, null, 2),
      '\n--- 分析完成時間 ---',
      analysisTime
    ].join('\n');
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
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
        <Typography variant="h6" sx={{ mb: 2 }}>輸入提示詞</Typography>
        <RadioGroup 
          row={!isMobile} 
          value={promptType} 
          onChange={(e) => setPromptType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="default" control={<Radio />} label="預設提示詞" />
          <FormControlLabel value="custom" control={<Radio />} label="客製化提示詞" />
        </RadioGroup>
        
        {promptType === 'default' ? (
          <TextField
            fullWidth
            multiline
            rows={8}
            disabled
            value={DEFAULT_PROMPT}
            variant="outlined"
            sx={{ mb: 2, bgcolor: 'background.paper' }}
          />
        ) : (
          <TextField
            fullWidth
            multiline
            rows={8}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="請輸入客製化提示詞..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>輸入文字資訊</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          請使用工具箱中的語音轉文字工具，將逐字稿複製到輸入框中進行測試。
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={10}
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="請輸入或貼上文字資訊..."
          variant="outlined"
          sx={{ mb: 3 }}
          error={Boolean(apiError)}
          helperText={apiError}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading || !queryText.trim()}
          sx={{ 
            minWidth: isMobile ? '100%' : '200px',
            background: 'var(--Secondary-, #5C443A)',
            '&:hover': {
              background: 'rgba(92, 68, 58, 0.8)',
            }
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              AI 分析中...
            </>
          ) : '開始財務風險評估'}
        </Button>
      </Box>
    </Box>
  );

  // Render assessment result
  const renderAssessmentResult = () => {
    if (!assessmentResult) return null;
    
    const riskInfo = calculateRiskScore();
    const groupedItems = groupAssessmentItems();
    
    return (
      <Box>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1 }}>總體財務風險評估</Typography>
          <Typography variant={isMobile ? "h4" : "h3"} color={riskInfo.color} fontWeight="bold">
            {riskInfo.level} ({riskInfo.score} 分)
          </Typography>
          
          {riskInfo.level === '低度財務風險' && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              短期內無財務壓力，長期財務狀況良好
            </Typography>
          )}
          
          {riskInfo.level === '中度財務風險' && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              需靠周轉維持生活，有一定財務壓力
            </Typography>
          )}
          
          {riskInfo.level === '高度財務風險' && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              財務狀況可能危及生存、居住安全、家庭和諧或個人健康
            </Typography>
          )}
        </Box>
        
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <Card key={groupName} sx={{ mb: 3 }}>
            <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, borderBottom: '1px solid', pb: 1 }}>
                {groupName}
              </Typography>
              
              {sortAssessmentItems(items).map((item) => (
                <Box key={item.familyfinhealthCaseSurveyResponseId} sx={{ mb: 4 }}>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 1 }}>
                    {item.organizationColumn.columnName}
                  </Typography>
                  
                  <RadioGroup 
                    value={item.familyfinhealthOptionId} 
                    sx={{ ml: isMobile ? 1 : 2, mb: 2 }}
                  >
                    {item.organizationColumn.organizationOptionList
                      .sort((a, b) => a.organizationOptionValue - b.organizationOptionValue)
                      .map((option) => (
                        <FormControlLabel
                          key={option.organizationOptionId}
                          value={option.organizationOptionId}
                          control={<Radio checked={option.organizationOptionId === item.familyfinhealthOptionId} />}
                          label={option.organizationOptionName}
                          disabled
                          sx={{
                            ...(option.organizationOptionId === item.familyfinhealthOptionId && {
                              fontWeight: 'bold',
                              color: 'primary.main'
                            })
                          }}
                        />
                      ))}
                  </RadioGroup>
                  
                  <Box sx={{ ml: isMobile ? 1 : 2, p: isMobile ? 1 : 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      AI 判斷理由:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {item.familyfinhealthCaseSurveyResponseReasoning}
                    </Typography>
                    <Typography variant="subtitle2">
                      信賴度: {(item.familyfinhealthCaseSurveyResponseConfidenceScore * 100).toFixed(0)}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: 2,
          mt: 4 
        }}>
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
      <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        財務風險快篩系統
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant={isMobile ? "fullWidth" : "standard"}>
              <Tab label="輸入區" />
              <Tab label="結果呈現區" disabled={!assessmentResult} />
            </Tabs>
          </Box>
          
          {activeTab === 0 && renderInputForm()}
          {activeTab === 1 && renderAssessmentResult()}
        </CardContent>
      </Card>
    </Container>
  );
}