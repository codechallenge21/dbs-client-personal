import React from "react";
import {
  Tab,
  Box,
  Tabs,
  Paper,
  Grid2,
  styled,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import {
  StarBorderRounded,
  ContentCopyRounded,
  ArrowBackIosRounded,
  ArrowDropDownRounded,
  ThumbDownOffAltRounded,
  SettingsInputComponentRounded,
  SyncRounded,
  PermIdentityRounded,
  PushPinRounded,
  ReplayRounded,
} from "@mui/icons-material";

function TabPanel(props: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const SummaryDetailPage = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [aIAnalysisTabValue, setAIAnalysisTabValue] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAIAnalysisTabChange = (
    _: React.SyntheticEvent,
    newValue: number
  ) => {
    setAIAnalysisTabValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "96vh",
          maxHeight: "96vh",
          borderRadius: "8px",
          padding: "16px 32px",
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#212B36",
            },
          }}
        >
          <Tab
            label="智能生活轉文字"
            sx={{
              color: "#637381",
              "&.Mui-selected": {
                color: "#212B36",
              },
            }}
          />
          <Tab
            label="家系圖"
            sx={{
              color: "#637381",
              "&.Mui-selected": {
                color: "#212B36",
              },
            }}
          />
          <Tab
            label="問答語音錄音"
            sx={{
              color: "#637381",
              "&.Mui-selected": {
                color: "#212B36",
              },
            }}
          />
          <Tab
            label="個別與實時錄音"
            sx={{
              color: "#637381",
              "&.Mui-selected": {
                color: "#212B36",
              },
            }}
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            padding: "8px 16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <ArrowBackIosRounded sx={{ color: "black" }} />
            </IconButton>
            <Typography
              sx={{
                overflow: "hidden",
                color: "var(--Text-Primary, #212B36)",
                textOverflow: "ellipsis",
                fontFamily: "Inter",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              DBS_2024/12/01_OO市OO區OO路OO號_OO會議廳
            </Typography>
            <IconButton>
              <ArrowDropDownRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <StarBorderRounded sx={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <SettingsInputComponentRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Box>
        <Grid2 container sx={{ flex: 1, height: "100vh" }}>
          <Grid2
            size={{ xs: 5 }}
            sx={{
              overflowY: "auto",
              height: "calc(100vh - 200px)",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px",
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                background: "#888",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <Item>
              <Paper variant="outlined" sx={{ padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  逐字稿
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1">原稿</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton>
                      <ContentCopyRounded sx={{ color: "black" }} />
                    </IconButton>
                    <IconButton>
                      <ThumbDownOffAltRounded
                        sx={{
                          color: "black",
                          transform: "scale(-1, -1)",
                        }}
                      />
                    </IconButton>

                    <IconButton>
                      <ThumbDownOffAltRounded sx={{ color: "black" }} />
                    </IconButton>
                  </Box>
                </Box>
                <Typography>
                  因為裡面有一個交讓每一個人上來之後覺得它是被克制化的非常重要。所以要秉持這個金去設計這些東西。然後再有一點就是在語音輸入或是它上傳檔案的時候，我們也會幫它產生對不對？對，那個後面還是要再連接一個東西。當今天上漲的這一段當我們解析完了之後也一樣。推薦他相關的議題，因為我們解析完之後大概就知道他鋪到什麼問題或是對哪些議題有興趣，對吧？對，因為你前面有做到推波嘛。對。對不對？在上傳檔案跟那個幫他解讀完子音這一部分，這個也很重要。好，那表示他要處理這些事情，所以我們就主動播我們給他的建議應該是什麼，他應該往哪裡去問題或找資料。好。目前看起來就是這個概念。要把它建立起來，所以我的地方只要做出來的東西都要去追蹤跟辨別他的意向跟氣圖跟他的滿意，然後記錄在L裡面。那每個人上來他只要有傳他的東西，問他的問題，後面就有一套拉的東西。在減少他的思考。好。OK。好。好，那這個頁面就要實際做出來，大家試的才有感覺。目前看起來就是清爽，我至少我個人是很直覺，很清楚。只是說那些字跟它的那個差別差異度要更明顯。好。因為這現在看不出來嘛，對不對？包括側邊側那些究竟哪一個什麼的功能是什麼這些東西要設計的更明顯一點。OK，好。OK，其他各位有沒有什麼要給一下？好，那個你看到那個對話的頁面。對，跟話。你有用過那個Cody嗎？Cloud有。有。你覺得Cody跟GPT最大的差別是什麼？嗯，C在產那個什麼程式碼的時候，它可以有一個直接可以看的那個頁面。會代表什麼？審複製貼上在那個ID的那個時間，然還有方便性。對，就是說現在你的排版啊，嗯簡單應該說是新爽的沒錯，但你右邊那個只要放記錄對不對？對可是記錄對於一個工作人他使用情是什麼？第一個你進去你還沒開始對話的時候，他已經佔了一款。嗯，對吧？嗯，第二個是你很多對話的時候你也不會在那邊找到東西。對吧？像我現在跟AI對話一兩千人。不會在那邊去找東西。嗯。好，那所以C跟確定力最大的差異就是他把頁面都在他當下要做的事情。讓你很讓工作者很好去操作。那Cody的主視覺是中間你跟他的對話，右邊那邊是產生什麼？生成的是你當下需要的其實的數據的斷是嗎？嗯，或是公式。嗯，或是等的一些被註質量。舉例來說。比如說以這個情定來說，它可能會需要什麼？說法條來。
                  源 。 嗯 ， 出 計 算 公 式 。 你 聽 懂 嗎 ？ 嗯 。 他 跟 你 對
                  話 ， 可 是 他 旁 邊 給 你 產 出 的 推 出 來 的 東 西 是 跟 你
                  現 在 對 話 有 關 的 相 關 資 料 ， 不 管 是 城 市 碼 還 是 什
                  麼 公 式 條 來 源 等 等 之 類 的 。 嗯 。 因 為 你 的 記 錄 指
                  示 絕 不 會 在 那 邊 是 一 個 沒 有 意 義 的 事 情 。 嗯 。 你
                  懂 的 意 思 ？ 所 以 為 什 麼 Cody 比 CH GVT 更 多 人 愛 用 的
                  原 因 在 這 邊 。 OK 。 所 以 的 那 些 如 果 他 真 的 需 要 用
                  到 歷 史 記 錄 那 通 常 就 會 牽 涉 全 文 嗯 對 吧 對 所 以 它
                  像 Cody 這 種 事 情 它 會 把 它 收 在 左 邊 下 面 你 把 它 切
                  開 在 工 具 的 下 方 然 後 它 可 以 去 砍 更 多 它 可 能 呈 現
                  最 近 的 級 筆 然 後 可 以 砍 更 多 更 多 的 話 就 是 進 到 他
                  的 全 點 左 比 如 說 你 可 以 要 找 到 哪 一 次 的 對 話 這 個
                  時 候 你 可 以 用 求 去 找 OK 對 吧 因 為 因 為 用 歷 史 記 錄
                  的 情 你 你 懂 意 思 對 然 後 再 來 就 是 因 為 我 們 的 AI 裡
                  面 它 不 是 只 有 AI 的 對 方 還 包 含 我 們 一 些 工 具 ， 比
                  如 說 利 率 計 算 比 如 說 等 等 之 類 的 發 條 發 條 庫 等 等
                  之 類 的 像 這 種 東 西 才 是 要 呈 現 在 主 OK 好 ， 然 後 那
                  個 字 體 大 小 跟 改 的 東 西 你 要 再 確 認 一 下 好 好 像 那
                  個 字 體 代 表 是 覺 得 有 點 太 小 你 剛 剛 旁 邊 有 一 頁 好
                  像 是 突 然 上 面 有 一 個 對 答 內 容 吧 ， 然 後 它 在 黑 的
                  一 整 好 對 內 容 在 哦 是 不 是 可 是 最 上 面 出 現 一 個 對
                  打 內 容 不 是 很 奇 怪 我 細 細 節 你 在 看 那 個 C 他 怎 麼
                  設 計 好 好 不 好 因 為 C 現 在 在 這 個 嗎 不 是 我 再 看 你
                  的 Big 嘛 。 哦 ， 好 好 。 就 是 你 要 確 保 你 站 在 主 視
                  覺 的 東 西 都 是 重 要 ， 而 且 必 要 的 。 嗯 ， 好 。 然 後
                  跟 當 下 工 作 沒 關 的 全 部 都 收 起 來 ， 我 就 舉 個 例 子
                  啊 。 現 在 的 來 源 。 假 設 它 法 條 有 十 幾 個 。 嗯 ， 或
                  是 它 那 個 計 算 公 式 有 很 多 樣 子 。 嗯 。 那 你 要 怎 麼
                  讓 它 ？ 在 這 個 這 個 位 置 上 。 嗯 。 現 現 在 確 不 好 讀
                  的 原 因 都 要 手 動 去 選 ， 然 後 去 貼 的 原 因 ， 就 是 因
                  為 他 把 它 全 部 提 在 一 起 。 嗯 。 對 吧 ？ 對 。 那 特 別
                  是 我 們 現 在 知 識 工 作 者 也 有 很 多 的 引 用 的 內 容 。
                  嗯 ， 那 如 果 你 把 這 些 東 西 跟 C 一 樣 是 用 就 是 主 要
                  的 工 作 視 窗 再 滑 出 來 ， 讓 它 可 以 去 看 。 是 不 是 會
                  讓 它 更 清 楚 ？ 嗯 。 到 底 內 容 哪 些 是 重 要 的 ？ 好 。
                  你 懂 我 意 思 ？ 對 ， 懂 。 好 吧 ， 你 就 去 多 玩 一 下 那
                  個 就 兩 者 的 差 異 。 好 。 OK 。 那 普 通 是 那 個 可 以 結
                  合 那 個 第 訊 息 還 有 個 功 能 就 是 那 個 加 到 我 們 最 愛
                  就 是 他 如 果 在 對 話 的 頻 道 裡 面 就 是 因 為 我 們 自 己
                  習 慣 會 會 把 它 存 起 來 就 下 次 的 時 候 沒 特 別 去 找 嗯
                  就 有 些 是 他 可 能 常 常 使 用 的 自 頂 這 樣 對 對 OK 好 好
                  好 好 就 他 可 以 聽 說 他 算 它 是 可 以 收 藏 因 為 他 可 能
                  覺 得 說 這 次 AI 這 對 話 內 容 這 歷 程 是 他 想 被 記 錄 起
                  來 嗯 那 我 們 雖 然 有 幫 記 錄 ， 但 是 他 想 要 把 它 直 接
                  存 起 來 收 藏 嗯 是 是 可 以 的 好 可 以 讓 就 快 好 好 好 ，
                  那 我 知 道 好 。 再 補 充 一 個 ， 另 外 一 個 是 那 個 語 音
                  轉 文 字 。 就 是 不 要 用 那 個 及 時 處 理 的 方 式 去 呈 現
                  。 因 為 它 已 經 是 個 排 層 。 所 以 它 是 好 了 以 後 會 投
                  資 它 。 它 上 傳 以 後 就 進 到 排 。 哦 ， 好 。 好 了 會 通
                  知 他 。 好 ， 他 不 用 在 那 邊 一 直 。 好 。 那 就 是 你 剛
                  剛 設 計 會 有 一 個 問 題 ， 就 是 他 會 覺 得 他 關 掉 那 個
                  視 窗 它 就 不 跑 。 但 其 實 後 還 在 。 嗯 對 吧 ， 所 以 你
                  就 你 可 以 看 那 個 Google Drive 。 你 是 不 是 上 傳 以 後
                  它 在 這 邊 轉 它 右 下 角 會 有 個 視 窗 。 對 ， 我 們 不 一
                  定 要 視 窗 ， 我 們 可 以 是 在 哪 邊 是 看 得 到 ， 嗯 ， 他
                  在 跑 的 進 度 。 OK, 跑 了 以 後 記 信 或 是 跳 訊 息 通 知
                  他 都 可 以 。 OK 。 然 後 讓 他 的 視 覺 是 他 上 傳 以 後 他
                  知 道 油 在 跑 ， 然 後 但 是 不 要 被 講 。 他 的 接 下 來 的
                  後 續 。 好 。 那 你 進 入 用 進 入 條 。 是 訊 息 ， 因 為 那
                  個 後 單 是 做 得 到 說 他 現 在 在 哪 個 階 段 ， 像 說 像 是
                  說 他 在 上 傳 中 或 是 他 在 語 運 總 字 ， 就 是 轉 路 中 ，
                  或 是 說 他 現 在 在 AI 生 成 中 ， 這 這 階 段 都 是 可 以 突
                  回 去 給 前 呈 現 ， 好 ， OK, 所 以 它 可 以 分 很 多 階 段
                  可 以 讓 這 個 知 道 ， 那 因 為 有 階 段 就 可 以 畫 出 那 個
                  白 分 。 好 ， 它 就 可 以 知 道 說 大 概 要 還 要 等 多 的 。
                  我 再 問 一 個 問 題 ， 你 那 個 左 上 角 那 個 漢 堡 是 要 幹
                  嘛 ？ 這 個 嗎 ？ 這 裡 嗎 ？ 漢 堡 。 還 是 右 邊 。 這 個 對
                  哦 ， 它 是 把 那 個 它 就 會 把 它 收 起 來 哦 對 就 是 操 控
                  開 關 這 樣 不 夠 直 觀 嗎 你 可 以 看 一 下 現 在 MI 的 用 的
                  ICON 類 型 是 哪 一 種 好 就 是 一 致 一 點 因 為 應 該 大 家
                  現 在 用 的 ICON 都 是 用 的 就 是 那 種 好 用 一 隻 一 點 好
                  OK 很 好 啊 ， 這 些 建 議 再 把 它 收 納 回 來 ， 然 後 再 我
                  有 那 個 在 上 面 回 答 請 你 的 三 位 接 下 來 開 始 定 那 個
                  時 一 個 一 個 功 能 大 概 什 麼 樣 的 時 裡 面 要 要 搭 配 一
                  個 是 資 料 設 計 R 相 關 前 後 台 的 城 市 碼 R 好 不 好 這
                  裡 面 一 定 有 很 多 排 序 的 問 題 。 OK, 會 關 係 到 大 家
                  的 工 作 排 。 因 為 先 這 邊 那 麼 多 的 功 能 要 大 家 要 同
                  步 ， 一 個 一 個 做 ， 每 一 個 都 要 做 完 整 ， 不 要 每 個
                  都 70% 。 知 道 嗎 ？ 所 以 我 們 這 裡 面 就 是 那 個 到 時
                  候 太 遠 你 在 帶 著 帶 著 他 們 講 ， 我 剛 才 講 過 講 過 的
                  那 一 段 不 要 在 這 邊 。 哦 ， 對 不 對 ？ 我 們 我 們 的 核
                  心 是 什 麼 ？ 應 該 怎 麼 看 待 這 個 事 情 ？ 對 吧 ？ 我 要
                  看 你 怎 麼 帶 他 們 把 時 把 工 作 一 個 一 個 建 立 起 來 。
                  好 不 好 ？ OK, 所 以 月 愉 悅 一 些 哪 一 些 功 能 資 料 要
                  起 。 然 後 要 起 來 ， 設 計 要 起 。 一 個 一 個 把 它 出 來
                  。 OK 。 哦 ， 很 好 。 你 問 你 留 言 留 在 哪 個 ？ 我 我 留
                  言 那 個 ， 你 可 能 沒 有 那 個 前 線 吧 ， 你 可 能 看 不 到
                  。 哦 。 你 們 三 個 應 該 有 看 到 。 沒 看 到 沒 關 係 。 我
                  我 那 個 回 應 的 地 方 ， 我 有 成 三 個 人 。 三 個 。 他 們
                  三 個 。 好 。 我 我 一 次 。 OK 。 好 不 好 ？ 有 問 題 再 隨
                  時 提 出 來 討 論 。 對 ， 大 家 。 然 後 然 後 那 個 還 有 一
                  個 是 因 為 手 機 感 那 頁 面 有 比 較 多 層 ， 它 可 能 進 到
                  發 燒 區 或 進 到 工 具 的 階 層 。 嗯 ， 那 但 是 我 們 還 希
                  望 它 能 夠 隨 時 可 以 進 行 更 AI 對 話 。 所 以 右 下 角 可
                  能 會 出 現 AI 的 。 可 以 做 使 用 。 OK, 這 個 C 它 有 設 計
                  ， 就 是 你 進 到 哪 頁 ， 它 都 還 是 可 以 讓 你 更 。 好 。
                  所 以 你 要 確 保 這 件 事 情 是 可 ， 然 後 再 來 就 是 如 果
                  有 碰 到 問 題 ， 它 可 以 有 機 器 的 給 我 。 個 回 饋 的 回
                  饋 按 鈕 那 個 許 願 詞 說 許 願 詞 也 可 以 ， 就 是 我 們 要
                  能 夠 收 集 方 便 收 另 外 一 個 意 識 。 哦 是 啊 我 們 要 很
                  方 便 的 收 集 他 們 資 料 。 OK, 所 以 這 個 要 設 計 出 去
                  。 好 ， OK, 好 ， 就 FBAT 按 鈕 。 因 為 許 願 是 他 們 專 業
                  相 關 的 想 要 的 知 識 跟 資 。 學 長 這 邊 講 的 大 概 就 是
                  他 在 使 用 上 系 統 上 的 那 個 C 這 樣 。 OK 啊 。 應 該 是
                  不 一 樣 的 事 情 。 好 。 好 吧 。 好 。 OK 。 我 想 問 一 個
                  是 在 那 個 語 音 文 字 之 後 ， 它 應 該 也 會 有 相 關 的 知
                  識 ， 那 如 果 在 問 答 的 部 分 的 話 ， 它 是 可 以 接 到 之
                  前 的 那 個 語 轉 制 的 知 識 。 因 為 看 起 來 好 像 是 兩 個
                  會 是 分 開 的 。 聽 懂 。 就 是 比 如 說 我 現 在 在 問 AI 問
                  答 的 部 分 ， 因 為 現 在 在 來 源 的 這 些 知 識 的 提 供 ，
                  它 好 像 是 從 網 站 上 面 。 當 然 那 個 如 果 今 如 果 有 那
                  個 因 為 就 轉 文 字 之 後 的 那 些 知 識 的 內 容 ， 它 也 是
                  可 以 有 埋 的 呈 現 。 你 只 是 說 像 N 這 樣 。 我 們 上 傳
                  一 段 語 音 。 那 它 就 會 有 獨 自 稿 跟 摘 藥 。 那 因 為 現
                  在 看 起 來 好 像 他 又 有 一 段 來 源 。 就 是 這 邊 這 邊 那
                  個 在 AI 問 答 的 時 候 ， 他 好 像 會 說 這 個 是 從 哪 裡 來
                  。 那 這 個 的 話 是 會 跟 這 個 語 音 轉 這 邊 有 。 沒 有 語
                  音 轉 字 出 來 。 就 就 是 逐 跟 摘 藥 啊 ， 怎 麼 會 有 從 哪
                  裡 。 在 比 如 說 我 在 AI 問 答 ， 我 現 在 有 傳 過 一 段 ，
                  就 是 之 前 的 會 議 記 錄 ， 那 如 果 在 AI 問 答 ， 我 問 他
                  在 為 議 題 。 他 可 以 告 訴 我 ， 比 如 說 這 從 哪 一 段 的
                  會 議 曾 經 有 講 過 哪 一 段 的 資 訊 。 說 他 資 源 要 從 我
                  們 某 一 段 語 音 來 。 就 是 來 源 ， 來 源 可 能 是 從 網 站
                  ， 有 從 他 沒 有 ， 你 兩 個 問 題 。 上 傳 檔 案 或 是 雲 傳
                  式 ， 我 們 處 理 的 就 是 它 的 。 字 感 再 加 上 根 據 他 字
                  感 整 理 出 來 的 的 這 個 SU 不 是 嗎 ？ 對 啊 這 個 怎 麼 會
                  有 來 有 的 問 題 ？ 我 是 從 呈 現 他 語 音 裡 面 講 什 麼 東
                  西 就 跑 出 來 ， 然 後 幫 他 做 一 個 就 做 這 個 事 情 怎 麼
                  會 有 知 識 來 的 問 題 。 我 想 我 想 指 的 是 那 個 在 AI 問
                  答 的 部 分 ， 可 是 我 真 是 在 回 去 問 他 這 樣 的 這 樣 的
                  ， 比 如 說 我 問 他 債 務 相 關 問 題 ， 然 是 我 們 有 一 個
                  討 論 的 結 果 。 別 方 式 。 那 它 會 從 我 們 先 前 的 會 議
                  記 錄 裡 面 如 果 我 們 要 整 理 出 來 的 內 容 它 會 從 裡 面
                  出 來 。 你 你 的 意 思 說 語 音 文 字 的 檔 案 又 變 成 來 源
                  之 一 的 。 資 料 來 源 之 一 。 這 個 要 要 再 要 再 那 個 想
                  一 下 。 因 為 原 轉 文 字 出 來 的 東 西 不 見 得 是 我 們 要
                  訓 練 到 資 料 庫 的 東 西 。 因 為 它 不 見 得 是 一 個 好 的
                  好 的 內 容 。 OK, 我 們 我 們 轉 文 字 跟 打 上 這 些 都 有
                  ， 我 們 只 幫 他 做 到 ， 幫 他 把 主 織 卡 打 出 來 ， 把 摘
                  藥 弄 出 來 ， 然 後 根 據 摘 藥 的 內 容 連 接 到 他 可 能 接
                  下 來 應 該 是 什 麼 意 ， 只 做 到 這 個 事 情 。 OK, 除 非
                  這 些 內 容 是 我 們 經 過 我 們 程 序 覺 得 要 訓 練 出 來 的
                  ， 因 為 剛 才 講 的 那 些 知 識 來 源 那 些 東 西 都 是 我 們
                  訓 練 出 去 的 ， 保 證 正 確 的 內 容 。 對 吧 ， 對 ， 那 這
                  些 語 音 轉 是 我 們 要 做 一 個 服 務 ， 會 讓 很 多 的 社 工
                  拿 來 玩 。 拿 來 用 。 那 這 一 邊 這 一 邊 一 邊 的 東 西 ，
                  我 我 不 見 得 會 讓 他 現 在 就 進 入 這 個 事 情 。 那 個 可
                  能 是 下 一 階 段 我 們 要 做 的 。 我 們 要 做 的 就 是 事 實
                  上 in center 的 強 項 是 每 一 個 人 都 有 可 以 一 個 自 於
                  還 空 間 。 有 一 個 類 似 它 的 檔 案 夾 或 fil 夾 。 等 下
                  一 階 段 的 時 候 ， 當 這 是 註 冊 他 的 身 份 進 來 。 不 管
                  是 社 工 或 是 或 是 支 註 冊 他 的 身 份 進 來 的 時 候 ， 他
                  可 以 開 一 個 專 屬 他 的 空 間 。 是 類 似 他 處 理 過 的 個
                  案 。 他 可 能 有 十 個 個 案 ， 20 個 案 ， 50 個 案 它 透 過
                  燈 。 你 也 可 能 也 要 保 留 讓 它 是 可 以 藏 在 裡 面 ， 就
                  是 下 一 層 ， 就 是 說 不 要 說 全 部 的 東 西 都 塞 在 這 裡
                  ， 因 為 這 樣 會 有 一 個 行 為 上 的 落 差 ， 就 是 說 像 我
                  解 決 馬 蘭 是 在 這 邊 切 換 。 的 時 候 ， 他 其 實 是 顧 問
                  的 切 換 。 嗯 ， 他 是 專 家 的 切 換 ， 他 不 是 頁 面 ， 他
                  就 是 只 是 我 要 問 的 那 個 顧 問 是 誰 ， 但 是 我 我 到 語
                  總 那 邊 的 時 候 變 成 它 是 工 具 箱 裡 面 的 分 頁 ， 就 是
                  紙 分 頁 的 意 思 ， 那 如 果 今 天 解 決 馬 是 它 現 在 有 其
                  他 紙 分 頁 ， 那 它 就 會 沒 有 地 方 放 。 OK 。 就 他 就 因
                  為 這 邊 我 已 經 用 掉 了 ， 所 以 我 就 沒 有 個 另 外 一 個
                  地 方 放 。 所 以 那 最 好 的 方 式 就 是 說 我 們 就 是 這 邊
                  可 以 保 留 讓 它 可 以 放 。 展 開 了 。 就 是 它 可 以 展 開
                  ， 對 ， 然 這 邊 放 可 能 就 我 們 就 定 義 說 他 這 就 是 專
                  門 出 現 過 穩 ， 所 以 剛 剛 像 那 個 智 能 語 音 那 邊 ， 它
                  其 實 就 不 用 出 現 。 應 該 是 目 前 現 在 嗯 他 頂 多 只 是
                  出 現 說 呃 在 右 邊 ， 在 右 邊 在 更 右 邊 跟 右 邊 ， 對 它
                  可 能 就 是 因 為 到 時 候 如 果 我 們 這 邊 有 下 一 層 這 邊
                  智 能 音 ， 它 可 能 就 出 現 在 這 個 ， 就 是 它 是 亮 藍 色
                  之 類 的 ， 嗯 嗯 ， 然 後 這 邊 可 能 就 不 需 要 。 除 非 說
                  今 天 這 個 語 音 又 要 用 什 麼 其 實 主 要 是 那 個 行 為 哦
                  ， 就 是 只 要 你 行 為 在 不 同 的 這 個 頻 道 切 換 的 時 候
                  讓 他 一 致 好 就 好 了 。 OK 。 對 ， 所 以 因 為 取 捨 的 關
                  係 ， 所 以 我 們 這 邊 其 實 應 該 要 保 留 讓 它 手 機 版 的
                  時 候 到 時 候 行 為 要 一 致 。 對 ， 因 為 手 機 版 到 時 候
                  已 經 會 塞 上 去 嘛 。 嗯 ， 它 展 開 以 後 是 看 到 什 麼 ？
                  因 為 現 在 這 邊 的 黑 。 黑 的 這 邊 我 們 它 的 它 的 想 像
                  就 是 它 是 假 設 是 切 換 某 些 東 西 。 可 是 當 他 收 起 來
                  以 後 變 手 機 版 的 時 候 ， 它 那 邊 又 換 了 一 個 換 了 一
                  個 是 行 為 ， 就 它 的 目 的 變 不 一 樣 ， 但 是 放 在 同 位
                  置 ， 但 放 在 同 的 位 置 的 話 會 更 壞 。 好 。 然 後 為 什
                  麼 會 有 藍 色 ？ 藍 色 是 新 感 色 藍 色 。 沒 有 。 那 你 用
                  藍 色 的 原 因 是 就 因 為 那 個 色 票 ， 色 票 我 還 沒 想 清
                  楚 要 怎 麼 打 。 目 前 的 話 大 概 是 因 為 拳 紅 ， 全 紅 跟
                  灰 白 其 實 頁 面 看 有 點 呆 。 是 全 紅 跟 全 黑 。 對 ， 全
                  紅 全 黑 。 它 有 中 間 。 中 間 電 色 是 灰 ， 灰 跟 白 ， 對
                  。 對 ， 有 點 呆 ， 所 以 。 沒 關 係 ， 要 其 他 顏 色 也 。
                  有 點 沒 溫 度 。 對 ， 太 沒 溫 度 ， 他 沒 有 ， 他 沒 有 進
                  C 嗎 ？ 你 沒 有 C 人 看 。 C 也 是 哪 一 個 ， 說 哪 一 個 C?
                  社 票 那 個 嗎 ？ 不 是 啦 。 設 計 規 範 。 不 是 ， 就 是 C
                  的 一 些 AI 啊 。 我 們 在 做 PVPD 的 那 個 。 他 他 有 他 有
                  C 。 哦 ， OK 。 對 對 對 。 我 意 思 是 說 就 是 你 要 用 跳
                  色 可 以 ， 可 是 要 是 在 他 的 色 票 範 圍 內 。 他 他 那 時
                  候 給 的 應 該 是 最 深 色 跟 黑 色 票 。 紅 黑 ， 然 後 會 到
                  中 間 的 灰 ， 紅 黑 灰 那 。 就 是 不 會 跳 到 藍 嘛 ， 對 不
                  對 ？ 那 你 應 該 是 紅 黑 灰 ， 然 後 你 叫 AI 去 跑 色 票 ，
                  射 票 圖 出 來 。 以 前 我 們 不 是 會 畫 九 ， 至 少 畫 12 格
                  。 我 記 得 。 minimal 他 給 的 就 是 就 是 從 從 這 個 顏 色
                  開 始 往 前 推 嘛 ， 嗯 對 ， 那 至 少 它 是 在 這 個 色 票 圖
                  裡 面 它 不 會 到 跳 色 ， 就 可 能 蛋 紅 蛋 會 那 個 要 再 配
                  就 是 你 可 以 ， 你 不 知 道 怎 麼 配 ， 你 叫 AI 去 配 就 是
                  或 是 有 那 個 軟 體 ， 就 是 有 專 門 配 色 漂 體 給 他 最 錢
                  ， 然 後 跟 輔 助 社 煮 色 輔 助 ， 然 後 他 去 配 色 圖 。 在
                  這 個 範 圍 內 比 較 不 會 突 兀 。 是 只 能 紅 跟 嗯 ， 黑 嗎
                  ？ 還 是 可 以 再 加 一 個 別 的 ？ 你 可 以 請 他 配 一 個 色
                  票 圖 出 來 。 我 目 前 有 找 到 一 個 色 票 是 就 是 可 以 搭
                  紅 的 ， 是 用 中 色 。 搭 起 來 和 諧 就 可 以 。 就 是 目 前
                  頁 面 就 是 就 像 那 個 按 鈕 我 就 是 用 種 色 ， 然 後 還 有
                  底 部 我 也 是 用 種 色 ， 對 對 對 。 應 該 這 樣 講 啦 。 嗯
                  你 要 配 什 麼 顏 色 是 我 們 可 以 決 定 ， 但 是 要 在 設 票
                  圖 。 你 要 個 邏 輯 。 OK, 好 ， 如 果 你 挑 戰 。 你 就 從
                  那 一 種 配 出 來 ， 那 我 們 用 最 紅 跟 黑 ， 然 後 去 跑 車
                  票 圖 。 嗯 ， 那 票 地 圖 現 在 我 們 決 定 在 這 票 圖 內 選
                  這 個 顏 色 。 嗯 。 假 設 別 人 有 其 他 建 議 ， 那 我 們 就
                  可 以 再 加 上 第 三 個 顏 色 再 跑 色 票 圖 。 好 。 至 少 你
                  要 一 個 邏 輯 。 除 非 說 你 今 天 就 算 用 來 ， 你 也 可 以
                  說 得 出 原 因 是 什 麼 ， 就 它 在 我 們 的 設 票 圖 裡 面 。
                  OK, 那 怎 麼 產 生 這 色 票 圖 ， 你 要 有 個 邏 輯 。 好 。
                  所 以 你 先 把 色 票 圖 弄 出 來 ， 然 後 選 個 顏 色 放 上 去
                  。 好 。 OK 。 好 ， 是 用 。 對 ， 我 是 用 鬼 反 ， 對 。 好
                  ， 謝 謝 局 長
                </Typography>
              </Paper>
            </Item>
          </Grid2>
          <Grid2 size={{ xs: 7 }} sx={{ height: "100%", overflowY: "auto" }}>
            <Item>
              <Paper variant="outlined" sx={{ padding: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "24px",
                      fontStyle: "normal",
                      lineHeight: "normal",
                      fontFamily: "DFPHeiBold-B5",
                      color: "var(--Primary-Black, #212B36)",
                    }}
                  >
                    {" "}
                    AI分析
                  </Typography>
                  {aIAnalysisTabValue === 1 && (
                    <Button
                      sx={{
                        gap: "8px",
                        color: "white",
                        display: "flex",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--Secondary-, #5C443A)",
                      }}
                      startIcon={<ReplayRounded />}
                    >
                      {" "}
                      重新整理
                    </Button>
                  )}
                </Box>
                <Tabs
                  value={aIAnalysisTabValue}
                  onChange={handleAIAnalysisTabChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#212B36",
                    },
                  }}
                >
                  <Tab
                    label="摘要"
                    sx={{
                      color: "#637381",
                      "&.Mui-selected": {
                        color: "#212B36",
                      },
                    }}
                  />
                  <Tab
                    label="問問AI"
                    sx={{
                      color: "#637381",
                      "&.Mui-selected": {
                        color: "#212B36",
                      },
                    }}
                  />
                  <Tab
                    label="相關資料"
                    sx={{
                      color: "#637381",
                      "&.Mui-selected": {
                        color: "#212B36",
                      },
                    }}
                  />
                </Tabs>

                <TabPanel value={aIAnalysisTabValue} index={0}>
                  <Box
                    sx={{
                      mt: "10px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">原稿</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton>
                        <ContentCopyRounded sx={{ color: "black" }} />
                      </IconButton>
                      <IconButton>
                        <ThumbDownOffAltRounded
                          sx={{
                            color: "black",
                            transform: "scale(-1, -1)",
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <ThumbDownOffAltRounded sx={{ color: "black" }} />
                      </IconButton>
                      <IconButton>
                        <SyncRounded sx={{ color: "black" }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mt: "10px" }}>
                    這段會議記錄討論的是一個AI輔助系統的介面設計。核心議題在於提升使用者體驗，減少使用者思考負擔，並提高工作效率。
                    討論重點包含介面布局的優化，例如參考Cody的設計，將重要的資訊和工具置於顯眼位置，並將次要資訊收納整理；同時也著重於使用者回饋機制的設計，以便收集使用者意見以改進系統。
                    此外，會議也涉及語音轉文字功能的流程優化以及整體視覺風格的調整，特別是顏色配置的邏輯性與一致性。
                  </Typography>
                </TabPanel>
                <TabPanel value={aIAnalysisTabValue} index={1}>
                  <Box
                    sx={{
                      padding: "0px 32px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mt: "23px",
                        height: "72px",
                        display: "flex",
                        maxWidth: "760px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          gap: "16px",
                          height: "72px",
                          display: "flex",
                          padding: "16px",
                          borderRadius: "8px",
                          alignItems: "center",
                          background: "var(--Secondary-Lite-Gray, #F5F5F5)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PermIdentityRounded
                            sx={{
                              width: "30px",
                              height: "30px",
                              color: "white",
                              borderRadius: "50px",
                              background: "#5C443A",
                            }}
                          />
                        </Box>
                        <Typography variant="body1">
                          我要協助個案擺脫負債，我應該怎麼做會比較好?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        mt: "10px",
                      }}
                    >
                      此專案的目標是透過提供一個線上平台來協助弱勢家庭改善財務狀況，並最終促進整體社會的福祉。
                      社會效益方面，此專案旨在： 改善家庭財務健康：
                      藉由提供財務知識、工具和資源，協助家庭更有效地管理財務，避免陷入債務困境。
                      減少社會問題：
                      透過改善家庭財務狀況，可以減少貧窮、隔代教養等社會問題。
                      提升社會工作效能：
                      平台可以協助社工更有效率地處理個案，並提供更精準的協助。
                      促進知識普及：
                      平台可以作為一個知識庫，讓大眾更容易取得相關資訊。
                      商業目標方面，此專案期望： 建立可持續營運模式：
                      透過與政府或企業合作，以及發展多元服務，確保平台的長期營運。
                      拓展國際市場： 將平台推廣至其他華人社會，甚至全球市場。
                      提升台灣IT和服務能力的國際能見度：
                      透過與新加坡政府的合作，展現台灣的技術實力和服務品質。
                      此專案的設計理念是將社會效益與商業目標緊密結合。透過解決社會問題，平台可以獲得更多使用者和支持，進而提升其影響力和商業價值。同時，商業上的成功可以確保平台的永續經營，使其能夠持續為社會帶來正面的影響。
                      專案團隊相信，透過科技和創新，可以有效地解決社會問題，並創造商業價值。
                      他們希望這個平台能夠成為一個典範，證明社會企業可以兼顧社會責任和商業成功。
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <IconButton>
                          <ContentCopyRounded sx={{ color: "black" }} />
                        </IconButton>
                        <IconButton>
                          <ThumbDownOffAltRounded
                            sx={{
                              color: "black",
                              transform: "scale(-1, -1)",
                            }}
                          />
                        </IconButton>
                        <IconButton>
                          <ThumbDownOffAltRounded sx={{ color: "black" }} />
                        </IconButton>
                        <IconButton>
                          <PushPinRounded sx={{ color: "black" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={aIAnalysisTabValue} index={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">原稿</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton>
                        <ContentCopyRounded sx={{ color: "black" }} />
                      </IconButton>
                      <IconButton>
                        <ThumbDownOffAltRounded
                          sx={{
                            color: "black",
                            transform: "scale(-1, -1)",
                          }}
                        />
                      </IconButton>

                      <IconButton>
                        <ThumbDownOffAltRounded sx={{ color: "black" }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    相關資料的描述可以填這裡...
                  </Typography>
                </TabPanel>
              </Paper>
            </Item>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default SummaryDetailPage;
