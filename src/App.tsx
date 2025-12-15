import { useState } from 'react';
import Dropdown from './components/Dropdown';
import NumberField from './components/NumberField';

type Option = { label: string; value: string };

const actionOptions: Option[] = [
  'Pause','Start','Notify','Increase bid','Decrease bid','Set bid','Adjust target ROAS'
].map(x => ({ label: x, value: x.toLowerCase().replace(/\s+/g,'_') }));

const entityOptions: Option[] = ['Campaign','Ad Group','Ad'].map(x => ({ label: x, value: x.toLowerCase().replace(/\s+/g,'_') }));

const metricOptions: Option[] = [
  'Cost','CPM','CPC','Impressions','Spend','Reach','Purchase ROAS','Current bid','Time greater than','Time less than','Daily Budget','Purchases','CTR','Leads Value','Active Ads in Adset'
].map(x => ({ label: x, value: x.toLowerCase().replace(/\s+/g,'_') }));

const rangeOptions: Option[] = [
  'Today','Yesterday','Today and yesterday','Last 3 days','Last 7 days','Last 14 days','Last 30 days','Last week'
].map(x => ({ label: x, value: x.toLowerCase().replace(/\s+/g,'_') }));

const operatorOptions: Option[] = [
  { label: '>', value: 'gt' },
  { label: '<', value: 'lt' },
  { label: '≥', value: 'gte' },
  { label: '≤', value: 'lte' },
  { label: '=', value: 'eq' },
  { label: '≠', value: 'ne' },
];

function App() {
  const [action, setAction] = useState<string | null>(actionOptions[0].value);
  const [entity, setEntity] = useState<string | null>(entityOptions[1].value); // default Ad Group
  const [metric, setMetric] = useState<string | null>(metricOptions[0].value);
  const [range, setRange] = useState<string | null>(rangeOptions[0].value);
  const [operator, setOperator] = useState<string | null>(operatorOptions[0].value);
  const [value, setValue] = useState<number>(0);

  const isCurrency = metric === 'cost' || metric === 'spend' || metric === 'cpc' || metric === 'cpm';

  return (
    <div className="flex flex-col gap-4 p-6 bg-white w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Task</span>
          <span className="text-gray-600 text-sm">Microcopy required</span>
        </div>
      </div>


      {/* Task card */}
      <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between gap-4 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-blue-600">{actionOptions.find(a=>a.value===action)?.label}</span>
            <span className="text-gray-600 text-xs">{entityOptions.find(e=>e.value===entity)?.label}</span>
          </div>
          <div className="flex gap-3">
            <Dropdown value={action} onChange={setAction} options={actionOptions} size="md" />
            <Dropdown value={entity} onChange={setEntity} options={entityOptions} size="md" />
          </div>
        </div>

        {/* Condition row */}
        <div className="flex items-center justify-center gap-4">
          <div className="vertical flex gap-2 justify-center p-2 rounded-lg items-center bg-blue-600 text-white font-semibold px-4">
            <i className="fa fa-plus"></i>
            <span>AND</span> {/* switches to or when you click on it, or with an orange bg instead of and with a blue bg and it should be the same height as the conditions... this happens when you click + condition, it adds more row as you click and it has them nested by the and or or gate... when you click on group, something unique happens, it adds a new condition row, but with an extra and button, such that the initial 2 is grouped together by and or or, then the third condition is standing too, but now connected by an and or or with the grouped 2, instead of being on a individual level, and on the and button of grouped conditions, we have the three menu dots, which opens a dropdown with the options, duplicate, ungroup, delete, and clicking on the and button still changes to or or from or to and...*/}
          </div>
        <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-stretch justify-start w-full shadow-md">
          <Dropdown
            value={metric}
            onChange={setMetric}
            options={metricOptions}
            className="w-56"
            buttonClassName="h-12"
            leftIcon={<i className="fa fa-bars text-gray-500" />}
          />
          <Dropdown
            value={range}
            onChange={setRange}
            options={rangeOptions}
            className="w-52"
            buttonClassName="h-12"
          />
          <Dropdown
            value={operator}
            onChange={setOperator}
            options={operatorOptions}
            className="w-28"
            buttonClassName="h-12"
          />
          <div className="flex-1 min-w-40">
            <NumberField
              value={value}
              onChange={setValue}
              prefixIcon={isCurrency ? <i className="fa fa-dollar text-gray-500" /> : undefined}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-stretch justify-start w-full shadow-md">
          <Dropdown
            value={metric}
            onChange={setMetric}
            options={metricOptions}
            className="w-56"
            buttonClassName="h-12"
            leftIcon={<i className="fa fa-bars text-gray-500" />}
          />
          <Dropdown
            value={range}
            onChange={setRange}
            options={rangeOptions}
            className="w-52"
            buttonClassName="h-12"
          />
          <Dropdown
            value={operator}
            onChange={setOperator}
            options={operatorOptions}
            className="w-28"
            buttonClassName="h-12"
          />
          <div className="flex-1 min-w-40">
            <NumberField
              value={value}
              onChange={setValue}
              prefixIcon={isCurrency ? <i className="fa fa-dollar text-gray-500" /> : undefined}
            />
          </div>
        </div>
        </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between w-full pt-2">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm">
              <i className="fa fa-plus" /> Condition
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm">
              <i className="fa fa-plus" /> Group
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm"> {/* when you click on the preview button, the preview card of the filled in details opens up and the preview text i highlighted with the text-blue-600 */}
              Preview
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm">
              Description
            </button>
          </div>
        </div>
      </div>

{/* preview card */}

    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-1">
        <span className="font-semibold">Pause</span>
        <span className="">(Ad Group)</span>
        <span>if</span>
      </div>
      <div className="flex gap-1 px-2 p-1 items-center border-l-2 border-blue-600">
        <span>Cost</span>
        <span>Today</span>
        <span>&gt;</span>
        <span>$ 50</span>
      </div>
    </div>

      <button className="bg-gray-100 hover:bg-gray-200 gap-2 inline-flex items-center px-4 py-2 rounded-md border border-gray-300 w-fit">
        <i className="fa fa-plus" />
        <span>Task</span>
      </button> {/* when you click on task, it should open an extra task card */}
    </div>
  );
}

export default App;
