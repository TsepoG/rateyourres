export const ActionButton = ({ onClick, children, buttonType = 'button' }) => (

  <button
    className={'border py-2 px-4 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-normal'}
    type={buttonType}
    onClick={onClick}>

    {children}
  </button>
)

export const PrimaryButton = ({ onClick, children, buttonType }) => (

  <button
    className={'border border-gray-400 font-medium rounded p-2'}
    type={buttonType}
    onClick={onClick}>

    {children}
  </button>
)