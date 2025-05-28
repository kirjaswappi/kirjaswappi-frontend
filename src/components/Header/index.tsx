import { useLocation } from 'react-router-dom';
import SideLeftDrawer from './_components/LeftSideDrawer';
import BookFilter from './_components/BookFilter';
import { FormProvider, useForm } from 'react-hook-form';
import { useMouseClick } from '../../hooks/useMouse';
import { useAppDispatch } from '../../redux/hooks';
import {
  setConditionFilter,
  setGenreFilter,
  setLanguageFilter,
} from '../../redux/feature/filter/filterSlice';
import { IFilterData } from '../../interface';
import TopBar from './_components/TopBar';
export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { clicked, reference } = useMouseClick<HTMLFormElement>();

  const showTopHeaderPath = ['/'];
  const isHeaderShow = showTopHeaderPath.find((path) => path === location.pathname);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      genre: [],
      language: [],
      condition: [],
    },
  });
  const { handleSubmit } = methods;
  const handleSubmitFn = async <T extends IFilterData>(data: T) => {
    dispatch(setGenreFilter(data.genre));
    dispatch(setConditionFilter(data.condition));
    dispatch(setLanguageFilter(data.language));
  };
  return (
    <header className={`${isHeaderShow ? 'pb-28' : 'pb-0'}`}>
      <FormProvider {...methods}>
        <SideLeftDrawer open={clicked}>
          <form ref={reference} onSubmit={handleSubmit((data) => handleSubmitFn(data))}>
            <BookFilter />
          </form>
        </SideLeftDrawer>
      </FormProvider>
      <div
        className={`${
          isHeaderShow ? 'block bg-light' : 'hidden'
        } fixed w-full  flex flex-col gap-[12px] z-30`}
      >
        <TopBar></TopBar>
      </div>
    </header>
  );
}
