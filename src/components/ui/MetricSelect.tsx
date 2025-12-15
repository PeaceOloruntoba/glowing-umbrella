import { Select } from "@mantine/core";
import type { Metric } from "../../types";

interface Props {
  value: Metric;
  onChange: (value: Metric) => void;
}

const MetricSelect: React.FC<Props> = ({ value, onChange }) => (
  <Select
    label="Metric"
    placeholder="Select metric"
    data={[
      { value: "spend", label: "Spend" },
      { value: "purchases", label: "Purchases" },
      { value: "impressions", label: "Impressions" },
      { value: "purchase_roas", label: "Purchase ROAS" },
      { value: "clicks", label: "Clicks" },
      // Add more...
    ]}
    value={value}
    onChange={()=>onChange}
  />
);

export default MetricSelect;
