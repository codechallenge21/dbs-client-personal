import ForumCard from "@/components/forum-card";
import HomeCategories from "./HomeCategories";
import { Container } from "@mui/material";
import { CommentSection } from "@/components/comment";

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
      <Container
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <CommentSection />
      </Container>
    </>
  );
}
