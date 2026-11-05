
const result = 1;
function TestStatus(data)
{
    return (
    <div>

      {(data.success === 'undefined') ? (
        <p>Loading</p>
      ) : (
        <p>Result: {data.success}</p>

      )}
    
    </div>
    )
}
export default result;
export {TestStatus};