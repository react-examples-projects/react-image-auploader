import { useState, useEffect, useRef } from "react";

export default function useMounted() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const isMounted = useRef(true);

  const setErrors = (hasError = false, errorDesc = null) => {
    setError(errorDesc);
    setIsError(hasError);
  };

  const setState = ({
    hasError = false,
    error = null,
    loading = false,
    _data = null,
  }) => {
    if (isMounted.current) {
      if (hasError) {
        setErrors(true, error);
        setIsLoading(false);
        return;
      }
      setErrors();
      setIsLoading(loading);
      setData(_data);
    }
  };

  const init = (promise) => {
    if (!(promise instanceof Promise)) {
      throw new TypeError("The `promise` argument is not of type promise");
    }
    setState({ loading: true });
    promise.then(
      (res) => setState({ loading: false, _data: res }),
      (error) => setState({ hasError: true, error })
    );
  };

  useEffect(() => () => (isMounted.current = false), []);

  return {
    init,
    isLoading,
    isError,
    error,
    data,
  };
}
