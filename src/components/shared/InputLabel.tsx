export default function InputLabel({
    label,
    required,
    mb = '4px'
}: {
    label: string | undefined;
    required?: boolean;
    mb?: string;
}) {
    return (
        <div>
            {label && (
                <p className={`text-black text-sm mb-1 font-sofia ${mb}`}>
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </p>
            )}
        </div>
    );
}
