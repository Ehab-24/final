export default function Select({ name, title, value, onChange, options }: { name: string, title: string, value: string, onChange: (ev: any) => void, options: string[] }) {
    return (
        <div className="max-w-sm mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <select name={name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                    options.map(op => (
                        <option value={op} selected={value === op}>{op}</option>
                    ))
                }
            </select>
        </div>
    )
}
