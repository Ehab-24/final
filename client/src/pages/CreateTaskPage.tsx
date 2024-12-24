
import { useState } from "react";
import * as api from "../api"
import * as TokensManager from "../lib/TokensManager"
import SubmitButton from "../components/buttons/SubmitButton";
import { toast } from "react-toastify";
import H1 from "../components/typography/H1";

export default function CreateTaskPage() {

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <header className="flex justify-between items-center mb-6">
                <H1>Create a new task</H1>
            </header>

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
        if (!token)
            return
        if (!formData.heading) {
            toast.error('Heading field is required!')
            return
        }

        let result = await api.createTask(
            token,
            formData.heading,
            formData.description,
            'pending',
        )

        if (!!result && !result.error) {
            toast(`New task created!`)
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
