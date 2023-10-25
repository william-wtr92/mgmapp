import styles from "@/styles/components/UsersCard.module.css"
import Image from "next/image"
import { NavLink } from "../utils/NavLink"
import Button from "../Button"

const users = [
  { id: 1, firstname: "William", role: "Cassier" },
  { id: 2, firstname: "Pascal", role: "Manager" },
]

const UsersCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Membres</h1>
        <NavLink href="/all" label={"Tout voir"}>
          {" "}
          {""}
        </NavLink>
      </div>
      <div className={styles.card}>
        {users.map((user) => (
          <div key={user.id} className={styles.unit}>
            <Image
              src={"/images/test.jpg"}
              alt="user"
              className={styles.image}
              height={50}
              width={50}
            />
            <div className={styles.info}>
              <p className={styles.name}>{user.firstname}</p>
              <p className={styles.role}>{user.role}</p>
            </div>
          </div>
        ))}

        <div className={styles.add}>
          <Button
            label={"Ajouter un membre"}
            onClickAction={() => console.log("test")}
          />
        </div>
      </div>
    </div>
  )
}

export default UsersCard
