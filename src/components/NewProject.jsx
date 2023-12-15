import { useRef } from 'react';
import Input from "./Input"
import Modal from './Modal';

export default function NewProject({addProjectHandler, onCancelAddProject}) {
    const modalRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    // note: these are refs for a custom Component, so use the forwardRef in the component

    function saveHandler() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
            modalRef.current.open();
            return;
        }
        
        addProjectHandler({
            title:enteredTitle, 
            description:enteredDescription, 
            dueDate:enteredDueDate
        })
    }


    return (<>
    <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you add valid input.</p>
    </Modal>
    <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <button className="text-stone-800 hover:text-stone-950" onClick={onCancelAddProject}>Cancel</button>
            </li>
            <li>
                <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={saveHandler}>Save</button>
            </li>
        </menu>
        <div>
            <Input ref={titleRef} title="Title" />
            <Input ref={descriptionRef} title="Description" textArea />
            <Input type="date" ref={dueDateRef} title="Due Date" />
        </div>
    </div>
    </>)
}