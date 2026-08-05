import Button from "../../components/ui/Button";


type AttendanceFiltersProps = {

    selectedCategory:string;

    onSelectCategory:(category:string)=>void;

};



export default function AttendanceFilters({

    selectedCategory,

    onSelectCategory

}:AttendanceFiltersProps){


    const categories = [
        "Todas",
        "1",
        "2",
        "3",
        "4",
        "R",
        "E",
        "T"
    ];



    return (

        <div
            className="
                flex
                gap-2
                flex-wrap
                mb-6
            "
        >


        {
            categories.map((category)=>(


                <Button

                    key={category}

                    variant={
                        selectedCategory === category
                        ? "primary"
                        : "secondary"
                    }

                    onClick={() =>
                        onSelectCategory(category)
                    }

                >

                    {category}


                </Button>


            ))
        }


        </div>


    );

}