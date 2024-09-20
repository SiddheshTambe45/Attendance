


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../../Utils/AxiosInstance'; // Adjust the import as per your project structure
// import './DivisionCalculation.css'; // Import custom CSS for styling

// const DivisionCalculation = () => {
//     const [branches, setBranches] = useState([]);
//     const [loading, setLoading] = useState(true); // State for loading status
//     const [error, setError] = useState(null); // State for error handling

//     // Fetch branch data from backend on component mount
//     useEffect(() => {
//         const fetchBranchData = async () => {
//             try {
//                 const response = await axiosInstance.get('/admin/getDivisionData'); // Adjust the endpoint as needed
//                 setBranches(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch data from backend');
//                 setLoading(false);
//             }
//         };

//         fetchBranchData();
//     }, []);

//     // Handle intake change to calculate divisions and update state
//     const handleIntakeChange = (index, value) => {
//         const intake = parseInt(value, 10) || 0;
//         const numDivisions = Math.ceil(intake / 60);

//         const updatedBranches = [...branches];
//         updatedBranches[index].intake = value;
//         updatedBranches[index].divisions = numDivisions;
//         updatedBranches[index].divisionNames = Array(numDivisions).fill('');
//         setBranches(updatedBranches);
//     };

//     // Handle change of division names
//     const handleDivisionNameChange = (branchIndex, divisionIndex, value) => {
//         const updatedBranches = [...branches];
//         updatedBranches[branchIndex].divisionNames[divisionIndex] = value;
//         setBranches(updatedBranches);
//     };

//     // Submit data to backend
//     const handleSubmit = async () => {
//         const data = branches.map(branch => ({
//             name: branch.name,                         // Branch name
//             genericName: branch.genericName || null,   // Optional: generic name, if applicable
//             intake: parseInt(branch.intake, 10),       // Convert intake to a number
//             divisions: branch.divisions,               // Number of divisions
//             divisionNames: branch.divisionNames        // Array of division names
//         }));

//         try {
//             await axiosInstance.post('/admin/saveDivisionData', data); // Adjust the endpoint as needed
//             alert('Data submitted successfully!');
//         } catch (err) {
//             console.error('Submission error:', err);
//             alert('Failed to submit data to backend');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="container mt-4">
//             <h2>Division Calculation</h2>
//             <div className="mb-4">
//                 <h4>Branch Division Inputs</h4>
//                 <div className="row mb-2">
//                     <div className="col"><strong>Branch Name</strong></div>
//                     <div className="col"><strong>Intake</strong></div>
//                     <div className="col"><strong>Divisions Calculated</strong></div>
//                     <div className="col"><strong>Division Names</strong></div>
//                 </div>
//                 {branches.map((branch, index) => (
//                     <div className="mb-4" key={index}>
//                         <div className="row mb-2">
//                             <div className="col">
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-sm"
//                                     value={branch.name}
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="col">
//                                 <input
//                                     type="number"
//                                     className="form-control shadow-sm"
//                                     value={branch.intake || ''}
//                                     onChange={(e) => handleIntakeChange(index, e.target.value)}
//                                 />
//                             </div>
//                             <div className="col">
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-sm"
//                                     value={branch.divisions || ''}
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="col">
//                                 <div className="division-box py-0 border-0">
//                                     {branch.divisions > 0 && branch.divisionNames.map((name, divisionIndex) => (
//                                         <input
//                                             key={divisionIndex}
//                                             type="text"
//                                             className="form-control division-input shadow-sm"
//                                             maxLength="1"
//                                             value={name}
//                                             placeholder={`Div ${String.fromCharCode(65 + divisionIndex)}`}
//                                             onChange={(e) => handleDivisionNameChange(index, divisionIndex, e.target.value)}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
//             </div>
//         </div>
//     );
// };

// export default DivisionCalculation;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Utils/AxiosInstance'; // Adjust the import as per your project structure
import './DivisionCalculation.css'; // Import custom CSS for styling

const DivisionCalculation = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const response = await axiosInstance.get('/admin/getDivisionData'); // Adjust the endpoint as needed
                setBranches(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data from backend');
                setLoading(false);
            }
        };

        fetchBranchData();
    }, []);

    const handleIntakeChange = (index, value) => {
        const intake = parseInt(value, 10) || 0;
        const numDivisions = Math.ceil(intake / 60);

        const updatedBranches = [...branches];
        updatedBranches[index].intake = value;
        updatedBranches[index].divisions = numDivisions;
        updatedBranches[index].divisionNames = Array(numDivisions).fill('');
        setBranches(updatedBranches);
    };

    const handleDivisionNameChange = (branchIndex, divisionIndex, value) => {
        const updatedBranches = [...branches];
        updatedBranches[branchIndex].divisionNames[divisionIndex] = value;
        setBranches(updatedBranches);
    };

    const handleCheckboxChange = (index, checked) => {
        const updatedBranches = [...branches];
        updatedBranches[index].finalized = checked;
        setBranches(updatedBranches);
    };

    const handleSubmit = async () => {
        const data = branches.map(branch => ({
            name: branch.name,
            genericName: branch.genericName || null,
            intake: parseInt(branch.intake, 10),
            divisions: branch.divisions,
            divisionNames: branch.divisionNames,
            finalized: branch.finalized || false, // Send the finalized status
        }));

        try {
            await axiosInstance.post('/admin/saveDivisionData', data); // Adjust the endpoint as needed
            alert('Data submitted successfully!');
        } catch (err) {
            console.error('Submission error:', err);
            alert('Failed to submit data to backend');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='DivisionCalculationAdmin' id='DivisionCalculationAdmin'>
        <div className="container mt-4">
            <h2>Division Calculation</h2>
            <div className="mb-4">
                <h4>Branch Division Inputs</h4>
                <div className="row mb-2">
                    <div className="col"><strong>Branch Name</strong></div>
                    <div className="col"><strong>Intake</strong></div>
                    <div className="col"><strong>Divisions Calculated</strong></div>
                    <div className="col"><strong>Division Names</strong></div>
                    <div className="col"><strong>Confirm</strong></div>
                </div>
                {branches.map((branch, index) => (
                    <div className="mb-4" key={index}>
                        <div className="row mb-2">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={branch.name}
                                    readOnly
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control shadow-sm"
                                    value={branch.intake || ''}
                                    onChange={(e) => handleIntakeChange(index, e.target.value)}
                                    disabled={branch.finalized}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={branch.divisions || ''}
                                    readOnly
                                />
                            </div>
                            <div className="col">
                                <div className="division-box py-0 border-0">
                                    {branch.divisions > 0 && branch.divisionNames.map((name, divisionIndex) => (
                                        <input
                                            key={divisionIndex}
                                            type="text"
                                            className="form-control division-input shadow-sm"
                                            maxLength="1"
                                            value={name}
                                            placeholder={`Div ${String.fromCharCode(65 + divisionIndex)}`}
                                            onChange={(e) => handleDivisionNameChange(index, divisionIndex, e.target.value)}
                                            disabled={branch.finalized}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <input
                                    type="checkbox"
                                    className="form-check-input shadow-sm"
                                    checked={branch.finalized || false}
                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                    disabled={branch.finalized}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        </div>
    );
};

export default DivisionCalculation;
