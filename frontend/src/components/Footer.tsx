import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { Stack, Typography } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Stack
      direction={"row"}
      // gap={"8rem"}
      justifyContent={"space-evenly"}
      sx={{ bgcolor: "#f3f3f3" }}
      paddingBlock={"2rem"}
      id="footer"
    >
      <Stack alignItems={"center"}>
        <Logo />
        <Typography color="secondary" fontWeight={"700"}>
          Apiários Azuis
        </Typography>
        {/* <Stack direction={"row"}>
          <a href="https://www.instagram.com/rafael_serafim0" target="_blank">
            <InstagramIcon htmlColor="#000" />
          </a>
          <a href="https://www.facebook.com/rafael_teixeira_serafim" target="_blank">
          <FacebookIcon htmlColor="#000"/>
          </a>
          <XIcon />
        </Stack> */}
      </Stack>
      <Stack gap={"0.75rem"}>
        <Stack direction={"row"} alignItems={"center"} gap={"0.875rem"}>
          <PlaceIcon color="secondary" />
          <Stack>
            <Typography sx={{ opacity: "70%" }} fontSize={"0.875rem"}>
              Rodovia Antônio Darós, 2440 - São João
              <br />
              Criciúma, SC - 88816-195
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={"0.875rem"}>
          <PhoneIcon color="secondary" />
          <Typography sx={{ opacity: "70%" }} fontSize={"0.875rem"}>
            (48) 99631-2562
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={"0.875rem"}>
          <EmailIcon color="secondary" />
          <Typography sx={{ opacity: "70%" }} fontSize="0.875rem">
            rafael.teixeiraserafim@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
