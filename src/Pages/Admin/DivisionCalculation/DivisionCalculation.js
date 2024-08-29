import React, { useState } from 'react';
import './DivisionCalculation.css'; // Import custom CSS for styling

const DivisionCalculation = () => {
    const [branches, setBranches] = useState([
        { name: 'Computer Engineering', intake: 0, divisions: 0, divisionNames: [] },
        { name: 'Information Technology', intake: 0, divisions: 0, divisionNames: [] },
        { name: 'Mechanical Engineering Information Technology', intake: 0, divisions: 0, divisionNames: [] }
    ]);

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

    const handleSubmit = () => {
        const data = branches.map(branch => ({
            branch: branch.name,
            intake: branch.intake,
            divisions: branch.divisions,
            divisionNames: branch.divisionNames
        }));
        // Submit data to backend here
        console.log(data);
    };

    return (
        <div className="container mt-4">
            <h2>Division Calculation</h2>
            <div className="mb-4">
                <h4>Branch Division Inputs</h4>
                <div className="row mb-2">
                    <div className="col"><strong>Branch Name</strong></div>
                    <div className="col"><strong>Intake</strong></div>
                    <div className="col"><strong>Divisions Calculated</strong></div>
                    <div className="col"><strong>Division Names</strong></div>
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
                                    value={branch.intake}
                                    onChange={(e) => handleIntakeChange(index, e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={branch.divisions}
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
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default DivisionCalculation;
