// import * as React from "react";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import ToggleButton from "@mui/material/ToggleButton";
// import Chip from "@mui/material/Chip";
// import CircularProgress from "@mui/material/CircularProgress";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionActions from "@mui/material/AccordionActions";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const Mui = () => {
//   const options = [
//     { label: "The Godfather", id: 1 },
//     { label: "Pulp Fiction", id: 2 },
//   ];

//   const [alignment, setAlignment] = React.useState("web");

//   const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <>
//       <p>Mui component</p>
//       <p>https://mui.com/material-ui/all-components/</p>
//       <div style={{ marginBottom: "24px" }}>
//         <Button color="secondary" variant="contained">
//           Cenas
//         </Button>
//       </div>

//       <div style={{ marginBottom: "24px" }}>
//         <ButtonGroup variant="contained" aria-label="Basic button group">
//           <Button>One</Button>
//           <Button>Two</Button>
//           <Button>Three</Button>
//         </ButtonGroup>
//       </div>

//       <div style={{ marginBottom: "24px" }}>
//         <Autocomplete disablePortal options={options} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Movie" />} />
//       </div>
//       <div style={{ marginBottom: "24px" }}>
//         <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
//           <ToggleButton value="web">Web</ToggleButton>
//           <ToggleButton value="android">Android</ToggleButton>
//           <ToggleButton value="ios">iOS</ToggleButton>
//         </ToggleButtonGroup>
//       </div>

//       <div style={{ marginBottom: "24px" }}>
//         <Chip label="Clickable" onClick={() => {}} />
//         <Chip label="Clickable" variant="outlined" onClick={() => {}} />
//       </div>
//       <div style={{ marginBottom: "24px" }}>
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       </div>
//       <div style={{ marginBottom: "24px" }}>
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
//             Accordion 1
//           </AccordionSummary>
//           <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
//             Accordion 2
//           </AccordionSummary>
//           <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </AccordionDetails>
//         </Accordion>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
//             Accordion Actions
//           </AccordionSummary>
//           <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </AccordionDetails>
//           <AccordionActions>
//             <Button>Cancel</Button>
//             <Button>Agree</Button>
//           </AccordionActions>
//         </Accordion>
//       </div>
//       <div style={{ marginBottom: "24px" }}>
//         <CircularProgress color="secondary" />
//         <CircularProgress color="success" />
//         <CircularProgress color="inherit" />
//       </div>
//       <div style={{ marginBottom: "24px" }}></div>
//     </>
//   );
// };

// export default Mui;
