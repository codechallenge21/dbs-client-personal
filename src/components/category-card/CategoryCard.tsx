import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface CategoryCardProps {
  readonly icon: string;
  readonly title: string;
  readonly link: string;
}

export default function CategoryCard({ icon, title, link }: CategoryCardProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={5}
      pb={0}
      px={4}
      position="relative"
      bgcolor="rgba(224, 190, 183, 0.12)"
      borderRadius="16px"
      overflow="hidden"
      border="1.5px solid transparent"
    >
      <Link href={link}>
        <Typography
          variant="h6"
          component="div"
          fontFamily="var(--font-bold)"
          fontWeight="bold"
          color="#e4d9d7"
          textAlign="center"
          sx={{
            width: "352px",
            mt: "-1.5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        <Box
          component="img"
          src={icon}
          alt={title}
          sx={{
            width: "100%",
            height: "auto",
            position: "relative",
          }}
        />
      </Link>
    </Box>
  );
}
