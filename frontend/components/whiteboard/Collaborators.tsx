
"use client";

interface Collaborator {

userId:string;

name:string;

avatar?:string;

color?:string;

status?:"online" | "offline";

}

interface CollaboratorsProps {

collaborators:
Collaborator[];

}

export default function Collaborators(
{
collaborators
}:CollaboratorsProps
){

return(

<div
  className="
  border
  rounded-lg
  p-4
  bg-white
  shadow-sm
  "
>

  <div
    className="
    flex
    items-center
    justify-between
    mb-4
    "
  >

    <h3
      className="
      font-semibold
      "
    >
      Collaborators
    </h3>

    <span
      className="
      text-sm
      text-green-600
      font-medium
      "
    >
      {
        collaborators.length
      } Online
    </span>

  </div>

  <div
    className="
    space-y-3
    "
  >

    {
      collaborators.length > 0
      ?

      collaborators.map(
        (
          user
        )=>(

          <div

            key={
              user.userId
            }

            className="
            flex
            items-center
            justify-between
            p-2
            border
            rounded
            "

          >

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              {
                user.avatar
                ?

                <img
                  src={
                    user.avatar
                  }
                  alt={
                    user.name
                  }
                  className="
                  w-10
                  h-10
                  rounded-full
                  "
                />

                :

                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-blue-500
                  text-white
                  flex
                  items-center
                  justify-center
                  "
                >
                  {
                    user.name
                    ?.charAt(0)
                    ?.toUpperCase()
                  }
                </div>

              }

              <div>

                <p
                  className="
                  font-medium
                  "
                >
                  {user.name}
                </p>

                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >
                  {user.userId}
                </p>

              </div>

            </div>

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <span

                className="
                w-3
                h-3
                rounded-full
                "

                style={{
                  backgroundColor:
                  user.status ===
                  "online"
                  ?
                  "#22c55e"
                  :
                  "#9ca3af"
                }}

              />

              <span
                className="
                text-xs
                capitalize
                "
              >
                {
                  user.status ||
                  "online"
                }
              </span>

            </div>

          </div>

        )
      )

      :

      <div
        className="
        text-center
        text-gray-500
        py-6
        "
      >
        No Active Collaborators
      </div>

    }

  </div>

</div>
);

}
