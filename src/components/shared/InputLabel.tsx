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
                <p className={`text-arsenic text-sm mb-1 font-normal font-poppins ${mb}`}>
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </p>
            )}
        </div>
    );
}
