import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";


const requestConfig = {};

export default function Meals(){

    const {data: loadedMeals, isLoading , error} = useHttp('http://localhost:3000/meals');

    if(isLoading){
        return <p className="center">Fetching meals...</p>
    }
    
    if(error){
        return <Error title="Faild to fetch meals" message={error} />
    }

    // if(!loadedMeals)
    //     return <p>No meals found.</p>

    return(
        <ul id="meals">{loadedMeals.map(meal=><MealItem key={meal.id} meal={meal}></MealItem>)}</ul>
    )
}

