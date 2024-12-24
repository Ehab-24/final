import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import * as api from '../api'
import * as TokensManger from '../lib/TokensManager'
import Spinner from "../components/spinner"
import H2 from "../components/typography/H2"
import H1 from "../components/typography/H1"
import ReactTimeAgo from 'react-time-ago'
import { H4 } from "../components/typography/H4"
import OutlinedButton from "../components/buttons/OutlinedButton"
import DestructiveButton from "../components/buttons/DestructiveButton"
import { toast } from "react-toastify";
import Button from "../components/buttons/Button";
import BreadCrum from "../components/BreadCrum";

export default function TasksPage() {

    const [tasks, setTasks] = useState<any[] | null>(null)

    async function removeTask(id: string) {
        if (!tasks)
            return
        const token = TokensManger.getToken()
        if (!token)
            return
        const result = await api.removeTask(token, id)
        if (!!result && !result.error) {
            const filtered = tasks.filter(t => t._id !== id)
            setTasks(filtered)
            toast('Removed Task')
        } else {
            toast.error(result?.error ?? "Could not delete task.")
        }
    }

    useEffect(() => {
        async function loadTasks() {
            const token = TokensManger.getToken()
            if (!!token) {
                const tasks = await api.tasks(token)
                console.log('Tasks:', tasks)
                if (tasks.hasOwnProperty('length')) {
                    setTasks(tasks)
                }
            }
        }
        loadTasks()
    }, [])

    if (tasks === null) {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <Spinner />
            </div>
        )
    } else if (tasks.length === 0) {
        return (
            <div className="w-full h-full grid place-items-center">
                <H1>No Tasks Yet.</H1>
                <CreateTaskButton />
            </div>
        )
    }
    else {
        return (
            <div className="px-4 md:px-20 xl:px-40">
                <div className="mt-20 mb-6 flex justify-end w-full">
                    <CreateTaskButton />
                </div>
                <H2>Tasks</H2>
                <ul className="flex flex-col gap-12 w-full">
                    {
                        tasks.map(t => (
                            <TaskListItem key={t._id} task={t} removeTask={removeTask} />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function CreateTaskButton() {

    const navigate = useNavigate()

    return (
        <Button onClick={() => navigate('/tasks/create')}>
            Create new task
        </Button>
    )
}

function TaskListItem({ task, removeTask }: { task: any, removeTask: (id: string) => void }) {

    const navigate = useNavigate()

    return (
        <li className="w-full rounded-md shadow-2xl shadow-black/30 flex flex-row items-center p-4 gap-12">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <H4>{task.heading}</H4>
                    <p className="text-sm text-gray-500 tracking-wide">
                        <ReactTimeAgo date={Date(task.updatedAt)} />
                    </p>
                </div>
                <BreadCrum bgColor={getStatusColor(task.status)}>{task.status}</BreadCrum>
                <p className="text-sm text-gray-900 leading-relaxed tracking-wide">{task.description}</p>
            </div>
            <div className="flex flex-col h-full min-h-full gap-4 justify-center items-end">
                <OutlinedButton onClick={() => { navigate(`/tasks/edit/${task._id}`) }}>
                    Edit
                </OutlinedButton>
                <DestructiveButton onClick={() => { removeTask(task._id) }}>
                    Delete
                </DestructiveButton>
            </div>
        </li>
    )
}

function getStatusColor(status: string): string {
    return status === 'pending' ? 'bg-yellow-200' : status === 'completed' ? 'bg-green-200'
        : status === 'paused' ? 'bg-red-200' : status === 'aborted' ? 'bg-purple-200' : 'bg-blue-200';
}
