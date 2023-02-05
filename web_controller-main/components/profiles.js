import React from "react";

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
                  <h3 key={"name" + index} className="name text-dark">
                    {value["Name"]}
                  </h3>
                </div>
              </div>
              <div className="item">
                <span>Carbon Saved: {parseInt(value["carbon"]) } pounds!</span>
              </div>
            </div>
          </>
        );

        // (
        // <div className="flex" key={index}>
        //     <div className="item">
        //         <img src={value["Image"]} alt="" />

        //         <div className="info">
        //             <h3 className='name text-dark'>{value.name}</h3>
        //             {/* <span>{value.location}</span> */}
        //         </div>
        //     </div>
        //     <div className="item">
        //         <span>{value["carbon"]}</span>
        //     </div>
        // </div>
        // )}
      })}
    </>
  );
}
