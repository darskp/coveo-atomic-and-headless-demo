import { Box, Typography, Link, Divider } from "@mui/material";

const INFO_TITLE = "✈️ Flight Search Interface";
const MAIN_DESCRIPTION =
  'Build a custom flight search interface using the Coveo Headless SDK and React. This demo uses a large flight dataset to simulate a real world search experience — featuring search, facets (Destination filter), results display, pagination, and sorting results based on the date.';
const SEARCH_EXAMPLES =
  "You can try searching for airlines such as Air India, Indigo, or SpiceJet.";
const RESULT_INFO_INTRO = "Each search result displays the following information:";
const DATASET_TITLE = "📂 Dataset Information";
const DATASET_DESCRIPTION =
  "The data used in this demo is from a public Kaggle dataset that includes flight prices, durations, and destinations.";
const DATASET_LINK = "https://www.kaggle.com/datasets/viveksharmar/flight-price-data";
const EXAMPLE_DISPLAY_TITLE = "✅ Example Display (in results)";

const RESULT_DETAILS = [
  {
    label: "Title",
    description:
      "Flight from {Source} to {Destination} – {Airline}",
  },
  {
    label: "Duration",
    description: "Displayed in hours and minutes",
  },
  {
    label: "Price",
    description: "Indian Rupees (₹)",
  },
];

const EXAMPLE_RESULTS = [
  {
    title: "Flight from Delhi to Mumbai – Air India",
    duration: "2h 10m",
    price: "₹4,500",
  },
  {
    title: "Flight from Bangalore to Goa – Indigo",
    duration: "1h 15m",
    price: "₹2,800",
  },
];

function InfoSection() {
  return (
    <Box
      sx={{
        mt: 1,
        mb: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        {INFO_TITLE}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
        {MAIN_DESCRIPTION.split("search").map((part, index, arr) =>
          index < arr.length - 1 ? (
            <span key={index}>
              {part}
              <strong>search</strong>
            </span>
          ) : (
            part
          )
        )}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
        {SEARCH_EXAMPLES}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
        {RESULT_INFO_INTRO}
      </Typography>

      <ul style={{ marginTop: 0, marginBottom: "16px", paddingLeft: "20px" }}>
        {RESULT_DETAILS.map((item, idx) => (
          <li key={idx}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <strong>{item.label}:</strong>{" "}
              {item.label === "Title" ? (
                <>
                  Flight from <code>{'{Source}'}</code> to <code>{'{Destination}'}</code> – <code>{'{Airline}'}</code>
                </>
              ) : (
                item.description
              )}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        {EXAMPLE_DISPLAY_TITLE}
      </Typography>

      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          "& th, & td": {
            border: "1px solid #ddd",
            padding: "8px",
            textAlign: "left",
          },
          "& th": { fontWeight: 600 },
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLE_RESULTS.map((row, idx) => (
            <tr key={idx}>
              <td>{row.title}</td>
              <td>{row.duration}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        {DATASET_TITLE}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
        {DATASET_DESCRIPTION}
      </Typography>

      <Link
        href={DATASET_LINK}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ fontWeight: 600 }}
      >
        🔗 View Dataset on Kaggle
      </Link>
    </Box>
  );
}

export default InfoSection;


//  [
//   'Airline',        'Source',
//   'Destination',    'Total_Stops',
//   'Price',          'Date',
//   'Month',          'Year',
//   'Dep_hours',      'Dep_min',
//   'Arrival_hours',  'Arrival_min',
//   'Duration_hours', 'Duration_min'
// ]