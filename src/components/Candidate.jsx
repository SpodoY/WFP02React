import { Paper, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bird from "../assets/voter_images/bird.jpg"
import cat from "../assets/voter_images/cat.jpg"
import fox from "../assets/voter_images/fox.jpg"
import owl from "../assets/voter_images/owl.jpg"
import raccoon from "../assets/voter_images/raccoon.jpg"

const CandidateCard = ({animalName, imgPos, candidateInfo, voteFunction}) => {

    const navigate = useNavigate();

    const images = {"bird": bird, "cat": cat, "fox": fox, "owl": owl, "raccoon": raccoon}
    const br = "16px";
    const cardRatios = {x: '350px', y: '233px'}
    
    console.log(candidateInfo)

    return ( 
        <>
            <Paper sx={{borderRadius: br, width: cardRatios.x, height: cardRatios.y}}>
                <Stack direction={"row"} height={cardRatios.y}>
                    <img
                        style={{
                            borderTopLeftRadius: br,
                            borderBottomLeftRadius: br, 
                            objectFit: "cover",
                            objectPosition: imgPos
                        }}
                        width={'180px'}
                        height={'100%'}
                        src={`${images[animalName]}`}
                    />
                    <Stack mx={2} direction={"column"} justifyContent={"space-between"}>
                        <Typography variant="h5"> {candidateInfo.name} </Typography>
                        <Button 
                            onClick={async () => {
                                await voteFunction(candidateInfo.id)
                                navigate("/results")
                            }} 
                            sx={{mb: 2}} variant="contained"> Vote </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
     );
}
 
export default CandidateCard;