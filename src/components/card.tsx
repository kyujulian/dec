
import TipTap from "./TipTap";

export default function Card({ front_text, back_text }: {
  front_text?: string,
  back_text?: string,
}) {

  return (
    <div>
      <h1 className="text-lg"> Front_text </h1>
      <p className="text-md">{front_text ? front_text : "Loading..."}</p>
      < h1 className="text-lg"> Back_text </h1 >
      {back_text ?
        (<TipTap content={back_text} />)
        : null}
    </div >
  );
}
