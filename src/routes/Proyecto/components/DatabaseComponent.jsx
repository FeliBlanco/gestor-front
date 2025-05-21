import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import useFetch from "../../../hooks/useFetch";
import DBCard from "./database/DBCard";
import EmptyState from "./database/EmptyState";
import CreateDatabaseModal from "./database/CreateDatabaseModal";

export default function DatabaseComponent({proyecto_usuario, proyecto_id}) {
    const { postFetch, getFetch } = useFetch()
    const [getDBs, setDBs] = useState([])
    const [getCreateDBData, setCreateDBData] = useState(null)

    const nuevo_usuario = proyecto_usuario ? proyecto_usuario.replaceAll('-', '_').replaceAll(' ', '') + '_' : ''

    useEffect(() => {
        loadDatabases();
    }, [])

    const loadDatabases = async () => {
        try {
            const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/databases/${proyecto_id}`)
            setDBs(response.data)
        }
        catch(err) {
            console.error(err)
        }
    }

    const onDeleteDatabase = async (db_id) => {
        setDBs(i => i.filter(db => db.id != db_id))
    }

    const onCreate = () => {
        setCreateDBData({ nombre: '' })
    }

    const onCreateDatabase = async (nombre) => {
        try {
            const nombre_db = `${nuevo_usuario}${nombre}`
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/create_database/${proyecto_id}`, {
                nombre: nombre_db
            })
            await loadDatabases()
            setCreateDBData(null)
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
        <Box>
            {getDBs.length === 0 ? (
                <EmptyState onCreate={onCreate} />
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 3,
                    padding: 2
                }}>
                    {getDBs.map((value, index) => (
                        <DBCard
                            key={`ds-${index}`}
                            id={value.id}
                            nombre={value.nombre}
                            usuario={value.database_name}
                            password={value.database_password}
                            onDelete={onDeleteDatabase}
                            onTest={() => window.location.href = `hola`}
                        />
                    ))}
                </Box>
            )}

            <CreateDatabaseModal 
                open={getCreateDBData != null}
                onClose={() => setCreateDBData(null)}
                onCreate={onCreateDatabase}
                prefixName={nuevo_usuario}
                initialData={getCreateDBData}
            />
        </Box>
    )
}