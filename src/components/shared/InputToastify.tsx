
interface IInputToastify {
    type: 'SUCCESS' | 'ERROR' | 'WARNING';
    value: string
}

export default function InputToastify({ type, value }: IInputToastify) {

    const getColorClass = () => {
        switch (type) {
            case 'SUCCESS':
                return 'bg-green-100 text-green-600';
            case 'ERROR':
                return 'bg-rose-100 text-rose-600';
            case 'WARNING':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return '';
        }
    };

    return (
        <div className={`p-2 rounded-md ${getColorClass()} text-center text-sm`}>{value}</div>
    )
}
