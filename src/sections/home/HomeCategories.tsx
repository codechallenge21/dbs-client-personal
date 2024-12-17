import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import data from "@/data/data.json";
import { CategoryCard } from "@/components/category-card";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function HomeCategories() {
  const cards = data.home.category_section.cards;

  // Confirm cards is an array
  if (!Array.isArray(cards)) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          paddingTop: { xs: "24px", sm: "40px" },
          paddingBottom: { xs: "24px", sm: "40px" },
          display: "grid",
          gap: { xs: "30px", sm: "3rem" },
          rowGap: { xs: "30px", sm: "100px" },
        }}
      >
        <Container
          sx={{
            marginTop: "30px",
            marginBottom: "30px",
            maxWidth: "1200px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#e4d9d7",
              fontWeight: "bold",
              fontFamily: "Roboto Serif, Helvetica",
              mb: 4,
              textAlign: "left",
            }}
          >
            快速入口
          </Typography>
          {/* Card display grid */}
          <Box
            sx={{
              gap: { xs: 3, lg: 2, xl: 4 },
              display: "grid",
              alignItems: "stretch",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)", // Three cards per row
              },
            }}
          >
            {cards.map((card) => (
              <Link href="/toolbox" key={card.title} >
                <CategoryCard {...card} />
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
