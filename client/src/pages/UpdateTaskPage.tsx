
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../api"
import * as TokensManager from "../lib/TokensManager"
import SubmitButton from "../components/buttons/SubmitButton";
import { toast } from "react-toastify";
import H1 from "../components/typography/H1";
import Select from "../components/select";

export default function UpdateTaskPage() {

    const { taskId } = useParams()
    const [task, setTask] = useState<any | null>(null)

    useEffect(() => {
        async function loadTask() {
            if (!taskId)
                return
            const token = TokensManager.getToken()
            if (!token)
                return
            const result = await api.task(token, taskId)
            if (!!result && !result.error) {
                console.log('task', result)
                setTask(result)
            } else {
                toast.error(`Error loading task!`)
            }
        }
        loadTask()
    }, [])

    if (!!task) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <header className="flex justify-between items-center mb-6">
                    <H1>Update {task.id}</H1>
                </header>

                <section className="mb-8">
                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                    </p>
                </section>

                <TaskForm initialTask={task} />

            </div>
        );
    } else {
        return (
            <div className="grid place-items-center w-full h-full">
                <H1>
                    Error while loading task.
                </H1>
            </div>
        )
    }
};


function TaskForm({ initialTask }: { initialTask: any }) {

    const [task, setTask] = useState<any>(initialTask)

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        let { name, value } = e.target;
        setTask((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const token = TokensManager.getToken()
        if (!token)
            return
        if (!task.heading) {
            toast.error('Heading field is required!')
            return
        }

        let result = await api.updateTask(token, task)
        if (!!result && !result.error) {
            toast(`Task updated!`)
            console.log("Task", result)
        } else {
            toast.error(`Error creating task, ${result.error}.`)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={task.heading}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Details</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex w-full justify-start">
                    <Select name="status" value={task.status} title="Status" options={[
                        "pending", "aborted", "completed", "paused"
                    ]} onChange={handleChange} />
                </div>
            </div>

            <SubmitButton className="w-full h-12">
                Save Task
            </SubmitButton>
        </form>
    )
}

