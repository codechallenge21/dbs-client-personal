export default function DynaFontScript() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.FontJSON = {
              User: "16697",
              DomainID: "D0005795KZB",
              Font: ["DFT_B5", "DFT_B7", "DFT_B3", "DFT_BC"]
            };
            `,
        }}
      />
      <script src='https://dfo.dynacw.com.tw/DynaJSFont/DynaFont_FOUT.js'></script>
    </>
  );
}
