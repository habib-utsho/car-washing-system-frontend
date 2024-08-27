import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/servicesApi";
import Container from "../components/ui/Container";
import { Skeleton } from "antd";

const Service = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleServiceQuery(id);
  return (
    <div className="py-8">
      <Container>
        {isLoading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">{id}</h1>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Service;
