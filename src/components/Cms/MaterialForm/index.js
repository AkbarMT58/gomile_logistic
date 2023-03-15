import { useEffect,  useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    update_material,
    delete_material
} from 'service/api';
import ModalAddMaterial from './ModalAddMaterial';
import swal from 'sweetalert';

export default function MaterialForm({ materials }) {
    const [allMaterials, setAllMaterials] = useState(materials)

    return (
        <div>
            <h1 className="text-xl font-bold mt-5 mb-8">Materials</h1>
            <div className='flex'>
                <ModalAddMaterial setAllMaterials={setAllMaterials}/>
            </div>

            <div className="category-wrapper bg-white rounded-lg p-2 drop-shadow-md">

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Material name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Material Indexes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMaterials.map((item, idx) => {
                                return <ItemRow key={idx} idx={idx} item={item} setAllMaterials={setAllMaterials} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const ItemRow = ({ idx, item, setAllMaterials }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [inputs, setInputs] = useState({
        id: item.id,
        display_name: item.display_name,
        subcategory_material_ids: item.subcategory_material_ids
    })

    const handleChangeSubcategoryMaterial = (e) => {
        setInputs({ ...inputs, subcategory_material_ids: e.target.value })
    }

    const handleUpdate = async () => {
        const arrMaterialIds = inputs.subcategory_material_ids.split(",")
        for (let i = 0; i < arrMaterialIds.length; i++) {
            arrMaterialIds[i] = parseInt(arrMaterialIds[i])
            if (isNaN(arrMaterialIds[i])) {
                swal('Oops', 'material index must be numbers', 'error');
                return;
            }

        }

        const payload = {
            id: inputs.id,
            display_name: inputs.display_name,
            subcategory_material_ids: arrMaterialIds
        }
        const response = await update_material(JSON.stringify(payload));
        if (response.status === 201) {
            setAllMaterials(materials => {
                const tempMaterials = [...materials]
                tempMaterials[idx] = payload
                return tempMaterials
            })
            swal('Submitted', 'Successfully update material', 'success');
        }

        setIsEdit(!isEdit)
    }

    const handleDelete = async (item) => {
        var result = swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        result.then(async result => {
            switch (result) {
                case true:
                    const response = await delete_material(item.id);
                    if (response.status === 200) {
                        setAllMaterials(response.data)
                        swal("Success!", "Successfully delete material!", "success");
                    }
                    break;
                default:
                    break;
            }
        })
        
    }

    const handleCancel = () => {
        setInputs({
            id: item.id,
            display_name: item.display_name,
            subcategory_material_ids: item.subcategory_material_ids.join(",")
        })
        setIsEdit(!isEdit)
    }
    useEffect(() => {
        setInputs({
            id: item.id,
            display_name: item.display_name,
            subcategory_material_ids: item.subcategory_material_ids.join(",")
        })
    }, [item])
    return (
        <tr key={item.id} className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                {
                    isEdit ? (
                        <input
                            name='display_name'
                            value={inputs.display_name}
                            onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                            className="border px-3 py-2"
                        />
                    ) : <span>{inputs.display_name}</span>
                }
            </th>
            <td className="px-6 py-4">
                {isEdit ? <input
                    name='subcategory_material_ids'
                    value={inputs.subcategory_material_ids}
                    onChange={handleChangeSubcategoryMaterial}
                    className="border px-3 py-2"
                /> : <span>{inputs.subcategory_material_ids}</span>}
            </td>
            <td className="px-6 py-4">

                {isEdit ? (
                    <>
                        <button className='px-2 py-1 border' onClick={handleCancel}>cancel</button>
                        <button className='px-2 py-1 border ml-2' onClick={handleUpdate}>submit</button>
                    </>
                ) : (
                    <>
                        <button onClick={e => setIsEdit(!isEdit)} >
                            <EditTwoToneIcon className='hover:text-orange-500'/>
                        </button>
                        <button onClick={e => handleDelete(item)} >
                            <DeleteIcon className='hover:text-orange-500'/>
                        </button>
                    </>
                )}
            </td>
        </tr>
    )
}