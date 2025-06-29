import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const InputField = ({ label, value, onChange, onClear }) => (
  <div className="input-wrapper">
    <div className={`input-container-floating ${value ? 'filled' : ''}`}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={onChange}
        required
      />
      <label className="floating-label">{label}</label>
      {value && (
        <button className="clear-btn" onClick={onClear}>
          ⓧ
        </button>
      )}
    </div>
  </div>
)

function Login() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [resposta, setResposta] = useState(null)

  const navigate = useNavigate() 

  const verifica = async () => {
    const dados = {
      usuario: input1,
      senha: input2
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`)
      }

      const json = await response.json()
      setResposta(json)

      navigate('/home')
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setResposta({ erro: error.message })
    }
  }

  return (
    <div className="app">
      <div className="container">
        <InputField
          label="Usuário"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          onClear={() => setInput1('')}
        />
        <InputField
          label="Senha"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          onClear={() => setInput2('')}
        />
        <button className="submit-button" onClick={verifica}>Acessar</button>
      </div>
    </div>
  )
}

export default Login
