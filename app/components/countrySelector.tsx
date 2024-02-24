'use client'

import useCountries from "../actions/getCountries";
import Select from "react-select"

export type CountrySelectionValue={
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string
}
interface CountrySelectProps{
    value?: CountrySelectionValue;
    onChange:(value: CountrySelectionValue)=>void;

}
const CountrySelect: React.FC<CountrySelectProps>=({
    value, 
    onChange
})=>{
    const { getAll }=useCountries()

    
    return(
        <div>
            <Select
            placeholder="Where?"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value)=>onChange(value as CountrySelectionValue)}
            formatOptionLabel={(option: any)=>(
                <div className="flex flex-row items-center gap-3">
                    <div>
                        {option.flag}
                    </div>
                    <div>
                        {option.label},
                        <span className="text-neutral-500 ml-1">{option.region}</span> 
                    </div>
                </div>
            )}            
            classNames={{
                control:()=>'p-3 border-2',
                input: ()=>'text-lg',
                option: ()=>'text-lg'


            }}
            theme={(theme)=>({
                ...theme,
                borderRadius:6,
                colors:{
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffa500	'
                }
            })}
            />
        </div>
    )
}
export default CountrySelect