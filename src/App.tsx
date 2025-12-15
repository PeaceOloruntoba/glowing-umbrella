function App() {
  return (
    <div className="flex flex-col justify-center items-start gap-4 p-6 bg-white w-full">
      <span className="text-2xl font-bold">Task</span>
      <span className="text-gray-700">Microcopy required</span>
      <div className="w-full flex flex-col gap-4 p-6 rounded-lg bg-gray-100">
        <div className="flex w-sm p-4 bg-white rounded border border-gray-300">
          <div className="flex flex-col">
            <span className="text-md font-semibold text-blue-500">Pause</span>
            <span className="text-gray-700 text-xs">Ad Group</span>
          </div>
          <i className="fa fa-dropdown"></i>
        </div>
        {/* a dropdown with options... Pause, Start, Notify, Increase bid, Decrease bid, set bid, Adjust target ROAS */}
        <div className="flex items-center justify-center w-full shadow shadow-md">
          <div className="flex w-sm p-4 bg-white rounded border border-gray-300 h-full justify-between">
            <div className="flex items-center gap-2">
              <i className="fa fa-menu"></i>
              <span className="text-gray-700 text-xs">Cost</span>
            </div>
            <i className="fa fa-dropdown"></i>
          </div>
          {/* a dropdown with options... Cost, CPM, CPC, Impressions, Spend, Reach, Purchase ROAS, Current bid, Time greater than, Time less than, Daily Budget, Purchases, CTR, Leads Value, Active Ads in Adset*/}
          <div className="flex w-sm p-4 bg-white rounded border border-gray-300 h-full justify-between">
            <span className="text-gray-700 text-xs">Today</span>
            <i className="fa fa-dropdown"></i>
          </div>
          {/* a dropdown with options... Today, Yesterday, Today and yesterday, Last 3 days, Last 7 days, Last 14 days, Last 30 days, Last week*/}
          <div className="flex w-sm p-4 bg-white rounded border border-gray-300 h-full justify-between">
            <span className="text-gray-700 text-xs">&gt;</span>
            <i className="fa fa-dropdown"></i>
          </div>
          {/* a dropdown with options... > greater than, < less than, >= greater than or equal to, <= less than or equal to, = equal to, =/= not equal to*/}
          <div className="flex w-sm p-4 bg-white rounded border border-gray-300 h-full justify-between">
            <i className="fa fa-dollar"></i>{" "}
            {/* the currency icon only shows when the first selection is money related */}
            <input
              type="text"
              placeholder="0"
              className="p-0 m-0 border-none outline-none"
            />
            <span className="flex gap-2">
              <i className="fa fa-settings"></i>
              <i className="fa fa-trash"></i>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-1">
              <i className="fa fa-plus"></i>
              <span className="text-sm">Condition</span>
            </button>
            <button className="flex items-center gap-1">
              <i className="fa fa-plus"></i>
              <span className="text-sm">Group</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-1">
              <span className="text-sm">Preview</span>
            </button>
            <button className="flex items-center gap-1">
              <span className="text-sm">Description</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
