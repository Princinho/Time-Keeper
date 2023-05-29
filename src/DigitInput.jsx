export default function DigitInput({ value, updateValue }) {
    return (
        <div>
            <input className="digitInput" size={2}
            onChange={(e)=>updateValue(e.target.value)}
             value={value} type='number' max={60} placeholder='--' />
        </div>

    )
}