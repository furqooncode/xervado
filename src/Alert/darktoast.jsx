import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className="fa-solid fa-circle-check" style={{ color: '#34d399', fontSize: '20px' }}></i>
        <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#d1fae5',
            fontSize: '18px',
            padding: '0 5px',
            opacity: 0.7,
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    ),
    {
      duration: 3000,
      icon:null,
      style: {
        background: '#064e3b',
        color: '#d1fae5',
        border: '1px solid #10b981',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    }
  );
};



//Error
export const showError = (message) => {
  toast.error(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className="fa-solid fa-circle-xmark" style={{ color: '#f87171', fontSize: '20px' }}></i>
        <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#fee2e2',
            fontSize: '18px',
            padding: '0 5px',
            opacity: 0.7,
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    ),
    {
      duration: 3000,
      icon:null,
      style: {
        background: '#7f1d1d',
        color: '#fee2e2',
        border: '1px solid #ef4444',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    }
  );
};