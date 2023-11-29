import { Box, Stack, Typography, Radio } from "@mui/material";

const CandidatePicker = ({sx = [], name, party, id}) => {

    return (  
        <Box sx={{ border: 2, borderRadius: 2}}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography fontSize={"1.3rem"} fontWeight={800} ml={2}> {name} </Typography>
                <Typography fontSize={"1.3rem"} fontWeight={800}> {party} </Typography>
                <Radio
                    onSelect={() => {}}
                    sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 32,
                        },
                    }}
                    value={id}
                />
            </Stack>
        </Box>
    );
}
 
export default CandidatePicker;