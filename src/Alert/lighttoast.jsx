import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: '20px' }}></i>
        <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#065f46',
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
        background: '#d1fae5',
        color: '#065f46',
        border: '1px solid #10b981',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    }
  );
};

export const showError = (message) => {
  toast.error(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className="fa-solid fa-circle-xmark" style={{ color: '#ef4444', fontSize: '20px' }}></i>
        <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#991b1b',
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
      duration: 4000,
      icon:null,
      style: {
        background: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #ef4444',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    }
  );
};