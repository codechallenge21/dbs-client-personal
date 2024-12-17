import ForumCard from "@/components/forum-card";
import HomeCategories from "./HomeCategories";
import { Container } from "@mui/material";

export default function HomeView() {
  return (
    <>
      <HomeCategories />
      <Container
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <ForumCard />
        <ForumCard />
        <ForumCard />
        <ForumCard />
        <ForumCard />
        <ForumCard />
        <ForumCard />
      </Container>
    </>
  );
}
