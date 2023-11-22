import { Box, Stack, Typography, Radio } from "@mui/material";

const CandidatePicker = ({sx = [], name, party, id}) => {
    return (  
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography> {name} </Typography>
                <Typography> {party} </Typography>
                <Radio
                    value={id}
                />
            </Stack>
        </Box>
    );
}
 
export default CandidatePicker;