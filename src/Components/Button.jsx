import { Button } from '@mui/material'
import { db } from '../Config/firebaseConfig'
import { deleteDoc, doc, } from 'firebase/firestore'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export const Delete = ({ row, coll }) => {

    return (
        <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}
            sx={{ margin: 2 }}
            onClick={() => {

                const docRef = doc(db, coll, row[0].id)
                deleteDoc(docRef).then(res => alert('done'))
                const docRef2 = doc(db, 'gudang', row[0].id)
                deleteDoc(docRef2).then(res => alert('done'))

            }}
        >
            Hapus
        </Button>
    )
}