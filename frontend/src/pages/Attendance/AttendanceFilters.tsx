type attendanceFiltersProps = {
    selectedCategory : string;
    onSelectCategory: (category:string) => void;
}

export default function AttendanceFilters({selectedCategory,onSelectCategory}: attendanceFiltersProps)  {
    
    const categories = [
            "Todas","1","2","3","4","R","E"
        ];

    return (
        <div>
            {categories.map((category)=>(
                <button
                    key={category}
                    onClick = { () => onSelectCategory(category)}
                    >
                    {category}</button>
                    
            ))}
        </div>    



    );
}