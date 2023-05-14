import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Publicación</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} y comparte increíbles consignas con el mundo, y deja volar tu
        imaginación con una plataforma impulsada por IA.
      </p>

    </section>
  )
}

export default Form
