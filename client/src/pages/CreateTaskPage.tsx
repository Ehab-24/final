
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../api"
import * as TokensManager from "../lib/TokensManager"
import SubmitButton from "../components/buttons/SubmitButton";
import { toast } from "react-toastify";
import { useAuth } from "../lib/AuthContext";

export default function CreateTaskPage() {

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Create a new task</h1>
            </header>

            {/* Property Details */}
            <section className="mb-8">
                <p className="mt-4 text-gray-600">
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                </p>
            </section>

            <TaskForm />

        </div>
    );
};


function TaskForm() {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const [formData, setFormData] = useState({
        heading: "",
        description: "",
        status: "pending"
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const token = TokensManager.getToken()
        if (!token) {
            return
        }

        console.log('creating task', formData.heading, formData.description)

        let result = await api.createTask(
            token,
            formData.heading,
            formData.description,
            'pending',
        )

        if (!!result) {
            if (result === 1) { // Assume that the token has expired
                toast.warn("Session expired!")
                logout()
                navigate('/login')
            } else if (result === 0) {
                toast.error("Error creating task, please try again later.")
            } else {
                toast(`New task created!`)
                console.log("Task", result)
            }
        } else {
            toast.error("Error creating task, please try again later.")
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
                        value={formData.heading}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Details</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <SubmitButton className="w-full h-12">
                Create Task
            </SubmitButton>
        </form>
    )
}
