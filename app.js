const { createRoot } = ReactDOM;


function EditableCell({ value, onValueChange, rowIndex, colIndex, centered }) {
  return (
    <input
      className={`focus:outline-none w-full h-10 focus:ring-blue-500 focus:border-blue-500 bg-blue-100 odd:bg-white ${
        centered ? "text-center" : "px-5"
      }`}
      type="text"
      value={value}
      onChange={(e) => onValueChange(e.target.value, rowIndex, colIndex)}
    />
  );
}

function EditableTable() {
  const { useState } = React;
  const [tableData, setTableData] = useState([
    { id: 1, task: "Google Search Console Access", descreption: "done" },
    { id: 2, task: "Google Analytics Access", descreption: "working" },
    { id: 3, task: "Website Access", descreption: "" },
    { id: 4, task: "Technical Audit", descreption: "" },
    { id: 5, task: "Anchor Text and Semantic Analysis", descreption: "" },
    { id: 6, task: "Competitor Analysis", descreption: "" },
    { id: 7, task: "Anchor Text / URL Mapping", descreption: "" },
    {
      id: 8,
      task: "Google Data Studio Report + Local Reporting Suite",
      descreption: "",
    },
    { id: 9, task: "Site Level Optimization", descreption: "" },
    { id: 10, task: "On Page Optimization", descreption: "" },
    { id: 11, task: "Content Creation", descreption: "" },
    { id: 12, task: "Content Publishing", descreption: "" },
    { id: 13, task: "Premium Press Release", descreption: "" },
    { id: 14, task: "Authority Niche Placements", descreption: "" },
    { id: 15, task: "Review Management", descreption: "" },
    { id: 16, task: "Index Links", descreption: "" },
    { id: 17, task: "Video Recap", descreption: "" },
  ]);

  const handleCellChange = (newValue, rowIndex, colIndex) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = newValue;
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
     
      const response = await fetch('http://localhost:3000/tableData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tableData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }finally{
        console.log('Data is Ready to Post ')
        console.log(tableData);
    }
  };
  
  return (
    <>
      <div className="relative overflow-x-auto pb-16">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/4">
                Month
              </th>
              <th scope="col" className="px-6 py-3 w-3/4">
                Item
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="odd:bg-blue-100 hover:bg-gray-100">
                <td className="border text-black">
                  <EditableCell
                    value={item.task}
                    onValueChange={(newValue) =>
                      handleCellChange(newValue, index, "task")
                    }
                    rowIndex={index}
                    colIndex="task"
                    centered={true}
                  />
                </td>
                <td className="border text-black">
                  <EditableCell
                    value={item.descreption}
                    onValueChange={(newValue) =>
                      handleCellChange(newValue, index, "descreption")
                    }
                    rowIndex={index}
                    colIndex="descreption"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 py-4 px-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<EditableTable />);
