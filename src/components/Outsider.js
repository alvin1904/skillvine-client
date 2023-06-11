import styles from "@/styles/outsiders.module.css";

export default function Outsider() {
  return (
    <div className={styles.container}>
      <p>
        <span>Oops!</span> It seems like you are trying to access a page that is
        restricted to members of our institution.
      </p>
      <p>
        We apologize for the inconvenience, but the email address you provided
        does not belong to our institution's domain. To ensure the security and
        privacy of our members, only individuals with valid institution email
        addresses are granted access to this page.
      </p>
      <p>
        If you believe this is an error or you need further assistance, please
        contact our support team at <span>skillvinerit@gmail.com</span>. Our
        team will be happy to assist you and provide any necessary information.
      </p>
    </div>
  );
}
