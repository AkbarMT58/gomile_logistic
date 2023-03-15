import { cancelAlreadyPO } from "service/api";
import CustomModal from "components/UI/CustomModal";

export default function CancelOrder({ id_so, invoice, setUpdate }) {
  const cancel = async (id_so, invoice) => {
    const body = JSON.stringify({ id_so, invoice });
    const data = await cancelAlreadyPO(body);
    return data?.status;
  };

  const content = {
    title: "Are you sure want to cancel ?",
    swal: "PO canceled successfully !",
  };

  return (
    <CustomModal
      buttonTitle="Cancel"
      content={content}
      actions={() => cancel(id_so, invoice)}
      setUpdate={setUpdate}
    />
  );
}
