import Canopy_Tent_Y5 from "./parts/canpoy_tent_y5";
import Canopy_Tent_Y6 from "./parts/canpoy_tent_y6";
import Canopy_Tent_Y7 from "./parts/canpoy_tent_y7";
import Umbrella_Bali from "./parts/umbrella_bali";
import Umbrella_Catalina from "./parts/umbrella_catalina";
import Umbrella_Kapri from "./parts/umbrella_kapri";
import Umbrella_Marco from "./parts/umbrella_marco";
import Umbrella_Santorini from "./parts/umbrella_santorini";

const product_description = (props) => {
    const {product = "", santoriniFrame = "aluminum"} = props;

    return (
        <>
            {product === "y5" ? <Canopy_Tent_Y5/> :
                product === "y6" ? <Canopy_Tent_Y6/> :
                    product === "y7" ? <Canopy_Tent_Y7/> :
                        product === "bali" ? <Umbrella_Bali/> :
                            product === "catalina" ? <Umbrella_Catalina/> :
                                product === "kapri" ? <Umbrella_Kapri/> :
                                    product === "marco" ? <Umbrella_Marco/> :
                                        product === "santorini" ? <Umbrella_Santorini frame={santoriniFrame}/> :
                                            null
            }
        </>
    )
}

export default product_description;