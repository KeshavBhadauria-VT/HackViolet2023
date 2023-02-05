import React from "react";
import Link from 'next/link'
export default function profiles({ Leaderboard }) {
  return <div id="profile">{Item(Leaderboard)}</div>;
}

function Item(data) {
  return (
    <>
      {data.map((value, index) => {
        console.log(value);
        return (
          <>
            <div className="flex" key={index}>
              <div className="item" key={"item" + index}>
                <img className="img-circle" src={value["Image"]} alt="" key={"image" + index} />
                <div className="info" key={"info" + index}>
                  <Link href={"/accounts/" + value['email']} key={"name" + index} className="name text-dark">
                    {value["Name"]}
                  </Link>
                </div>
              </div>
              <div className="item">
                <span>Carbon Saved: {parseInt(value["carbon"]) } pounds!</span>
              </div>
            </div>
          </>
        );

      })}
    </>
  );
}
