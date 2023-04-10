import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { ITableRoasting } from './RoastingTable';

const RoastingRow = ({roasting, handleEdit, handleMutationSync}: IRoastingRowProps) => {
    const axiosPrivate = useAxiosPrivate();

    const handleDelete = async () => {
        try {
            await axiosPrivate.delete(
                `/roasting/${roasting.id}`
            )
            await handleMutationSync();
        } catch (error) {
            console.log(error);
        }
    }
    
    if (roasting.id === -1) {
        return (
        <tr key={Math.random()} style={{height: '49px'}}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        )
    }
    else {
        return (
            <tr key={roasting.id}>
                <td>{roasting.coffeeFullRegion}</td>
                <td>{new Date(roasting.date).toDateString()}</td>
                <td style={{
                    textAlign: 'right'
                }}>
                    {roasting.amount.toFixed(2)}
                </td>
                <td style={{
                    textAlign: 'right'
                }}>
                    <button 
                        className='actionButton edit'
                        onClick={() => handleEdit(roasting)}
                    >
                        <i className='bi bi-pencil-square'/>
                    </button>
                    <button 
                        className='actionButton delete'
                        onClick={handleDelete}
                    >
                        <i className='bi bi-trash3'/>
                    </button>
                </td>
            </tr>
        )
    }
}

interface IRoastingRowProps {
    roasting: ITableRoasting,
    handleEdit: (roasting: ITableRoasting) => void,
    handleMutationSync: () => void
}

export default RoastingRow